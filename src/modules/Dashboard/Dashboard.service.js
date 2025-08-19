import { Usuario } from "../Usuario/Usuario.js";
import { Pedido } from "../Pedido/Pedido.js";
import { Herramienta } from "../Herramienta/Herramienta.js";
import { Estado_Pedido } from "../Estados_Pedido/Estados_Pedido.js";
import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";
import { Puesto } from "../Puesto/Puesto.js";
import { AsignacionPedido } from "../AsignacionPedido/AsignacionPedido.js";
import { CheckoutHerramienta } from "../CheckOut_Herramienta/CheckOutHerramienta.js";
import { Sequelize } from "sequelize";

class DashboardService {
  async getAdminDashboard() {
    try {
      const usuariosPorPuesto = await Usuario.findAll({
        attributes: [
          "puesto_id",
          [Sequelize.fn("COUNT", Sequelize.col("Usuario.id")), "total"]
        ],
        include: [{ model: Puesto, attributes: ["nombre_puesto"] }],
        group: ["puesto_id", "puesto.id"]
      });

      const pedidosPorEstado = await Pedido.findAll({
        attributes: ["estado_id", [Sequelize.fn("COUNT", Sequelize.col("pedidos.id")), "total"]],
        group: ["estado_id","estados_pedido.id"],
        include: [{ model: Estado_Pedido, attributes: ["nombre"] }]
      });

      const herramientasPorEstado = await Herramienta.findAll({
        attributes: [
          "estado_herramienta_id",
          [Sequelize.fn("COUNT", Sequelize.col("herramientas.id")), "total"]
        ],
        include: [{ model: Estado_Herramienta, attributes: ["nombre"], as:"estado_herramienta"}],
        group: ["estado_herramienta_id", "estado_herramienta.id"]
      });

      return {
        usuarios: {
          total: await Usuario.count(),
          porPuesto: usuariosPorPuesto
        },
        pedidos: {
          total: await Pedido.count(),
          porEstado: pedidosPorEstado
        },
        herramientas: {
          total: await Herramienta.count(),
          porEstado: herramientasPorEstado
        }
      };
    } catch (error) {
      throw new Error("Error al generar dashboard admin: " + error.message);
    }
  }

  async getCoordinadorDashboard() {
    try {
      // Preferiria yo iterar los estado que devolviera y buscar el pendiente o en proceso para asi usarlo y no buscarlo directamente en nombre pero bueno si Hopes le parece optimo asi pues ni modo
      //Arreglo para que almenos furule un poco
      /*
      const estadoPendiente = await Estado_Pedido.findOne({ where: { nombre: "Solicitado" } });
      const estadoProceso   = await Estado_Pedido.findOne({ where: { nombre: "En Proceso" } });
      const estadoUso       = await Estado_Herramienta.findOne({ where: { nombre: "En uso" } });*/
      const estadoPendiente = await Estado_Pedido.findOne({ 
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('nombre')), 
          'solicitado'      
        )
      });//especifiquen que no soy telepata/psiquico por si no le dan lo que buscan
      
      const estadoProceso = await Estado_Pedido.findOne({ 
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('nombre')), 
          'en proceso'
        )
      });
      
      const estadoUso = await Estado_Herramienta.findOne({ 
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('nombre')), 
          'en uso'
        )
      });
      // Verificar si se encontraron los estados
      if (!estadoPendiente) {
        console.log("Estado 'solicitado' no encontrado");
      }
      if (!estadoProceso) {
        console.log("Estado 'en proceso' no encontrado");
      }
      if (!estadoUso) {
        console.log("Estado 'uso' no encontrado");
      }

      // Solo hacer las consultas si los estados existen
      const pedidosPendientes = estadoPendiente 
        ? await Pedido.count({ where: { estado_id: estadoPendiente.id } })
        : 0;

      const pedidosEnProceso = estadoProceso 
        ? await Pedido.count({ where: { estado_id: estadoProceso.id } })
        : 0;

      const herramientasEnUso = estadoUso 
        ? await Herramienta.count({ where: { estado_herramienta_id: estadoUso.id } })
        : 0;

      return {
        pedidos: {
          pendientes: pedidosPendientes,
          enProceso: pedidosEnProceso
        },
        herramientas: {
          enUso: herramientasEnUso
        }
      };
    } catch (error) {
      throw new Error("Error al generar dashboard coordinador: " + error.message);
    }
  }
  async getOperarioDashboard(operarioId) {
    try {
      // 1) Buscar pedidos asignados al operario
      const asignaciones = await AsignacionPedido.findAll({
        where: { usuarioId: operarioId },
        include: [
          {
            model: Pedido,
            as: "pedido",
            include: [{ model: Estado_Pedido, attributes: ["nombre"] }]
          }
        ]
      });

      // Armar lista de pedidos con estado
      const pedidos = asignaciones.map(a => ({
        asignacionId: a.id,
        pedidoId: a.pedidoId,
        horaAsignada: a.horaAsignadas,
        estado: a.Pedido?.Estado_Pedido?.nombre || "desconocido"
      }));

      // 2) Herramientas en uso por operario (checkout no eliminado)
      const herramientasEnUso = await CheckoutHerramienta.findAll({
        where: { usuario_id: operarioId, delete: false },
        include: [{ model: Herramienta, as: "herramienta" }]
      });

      const herramientas = herramientasEnUso.map(ch => ({
        checkoutId: ch.id,
        herramientaId: ch.herramienta_id,
        horaDeCheck: ch.hora_de_check,
        detalle: ch.Herramienta // aquí va toda la info de la herramienta
      }));

      return {
        pedidos,
        herramientas: {
          total: herramientas.length,
          detalle: herramientas
        }
      };
    } catch (error) {
      throw new Error("Error al generar dashboard operario: " + error.message);
    }
  }
  async getTecnicoDashboard() {
    try {
      // Pedidos con estado de problemas (ej: "mantenimiento" o "reparación")
      const estadoProblema = await Estado_Pedido.findOne({ where: { nombre: "Pausado" } });
      const pedidosConProblema = await Pedido.count({ where: { estado_id: estadoProblema?.id } });
      const pedidosCP = await Pedido.findAll({where: {estado_id: estadoProblema?.id}});

      // Herramientas en reparación
      const estadoReparacion = await Estado_Herramienta.findOne({ where: { nombre: "Mantenimiento" } });
      const herramientasEnReparacion = await Herramienta.count({
        where: { estado_herramienta_id: estadoReparacion?.id }
      });
      const herramientasER = await Herramienta.findAll({
        where: { estado_herramienta_id: estadoReparacion?.id }
      });

      // Herramientas reparadas (opcional: si tienes un estado "disponible" después de reparación)
      const estadoDisponible = await Estado_Herramienta.findOne({ where: { nombre: "Disponible" } });
      const herramientasD = await Herramienta.findAll({
        where: { estado_herramienta_id: estadoDisponible?.id }
      });
      const herramientasDisponibles = await Herramienta.count({
        where: { estado_herramienta_id: estadoDisponible?.id }
      });

      return {
        pedidos: {
          conProblema: pedidosConProblema,
          pedidos:pedidosCP
        },
        herramientas: {
          enReparacion: herramientasEnReparacion,
          herramientaReparando: herramientasER,
          disponibles: herramientasDisponibles,
          herramientasDisponibles: herramientasD
        }
      };
    } catch (error) {
      throw new Error("Error al generar dashboard técnico: " + error.message);
    }
  }
}

export const dashboardService = new DashboardService();
