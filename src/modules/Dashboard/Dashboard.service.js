import { Usuario } from "../Usuario/Usuario.js";
import { Pedido } from "../Pedido/Pedido.js";
import { Herramienta } from "../Herramienta/Herramienta.js";
import { Estado_Pedido } from "../Estados_Pedido/Estados_Pedido.js";
import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";
import { Puesto } from "../Puesto/Puesto.js";
import { AsignacionPedido } from "../AsignacionPedido/AsignacionPedido.js";
import { CheckoutHerramienta } from "../CheckOut_Herramienta/CheckOutHerramienta.js";
import { Transaccion_Financiera } from "../Transaccion_Financiera/Transaccion_Financiera.js";
import { Sequelize } from "sequelize";
import { sequelize } from "../../shared/database/database.js";

class DashboardService {
// 📊 Dashboard Admin
  async getAdminDashboard() {
    try {
      // Usuarios por puesto
      const usuariosPorPuesto = await Usuario.findAll({
        attributes: [
          "puesto_id",
          [Sequelize.fn("COUNT", Sequelize.col("Usuario.id")), "total"]
        ],
        include: [{ model: Puesto, as: "puesto", attributes: ["nombre_puesto"] }],
        group: ["puesto_id", "puesto.id"]
      });

      // Pedidos por estado
      const pedidosPorEstado = await Pedido.findAll({
        attributes: [
          "estado_id",
          [Sequelize.fn("COUNT", Sequelize.col("Pedido.id")), "total"]
        ],
        include: [{ model: Estado_Pedido, as: "estado", attributes: ["nombre"] }],
        group: ["Pedido.estado_id", "estado.id", "estado.nombre"]
      });

      // Herramientas por estado
      const herramientasPorEstado = await Herramienta.findAll({
        attributes: [
          "estado_herramienta_id",
          [Sequelize.fn("COUNT", Sequelize.col("Herramienta.id")), "total"]
        ],
        include: [{ model: Estado_Herramienta, as: "estado_herramienta", attributes: ["nombre"] }],
        group: ["estado_herramienta_id", "estado_herramienta.id"]
      });

      // Transacciones financieras
      const transaccionesPorEstado = await Transaccion_Financiera.findAll({
        attributes: [
          "estado_transaccion_id",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
          [Sequelize.fn("SUM", Sequelize.col("monto_total")), "monto_total"]
        ],
        group: ["estado_transaccion_id"]
      });

      const transaccionesPorTipo = await Transaccion_Financiera.findAll({
        attributes: [
          "tipo_transaccion_id",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
          [Sequelize.fn("SUM", Sequelize.col("monto_total")), "monto_total"]
        ],
        group: ["tipo_transaccion_id"]
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
        },
        transacciones: {
          total: await Transaccion_Financiera.count(),
          montoTotal: await Transaccion_Financiera.sum("monto_total"),
          porEstado: transaccionesPorEstado,
          porTipo: transaccionesPorTipo
        }
      };
    } catch (error) {
      throw new Error("Error al generar dashboard admin: " + error.message);
    }
  }

  async getCoordinadorDashboard() {
    try {
      const pedidosPendientes = await Pedido.count({ where: { estado_id: 1 } });
      const pedidosEnProceso = await Pedido.count({ where: { estado_id: 2 } });
      const herramientasEnUso = await Herramienta.count({ where: { estado_herramienta_id: 2 } });

      const transaccionesRecientes = await Transaccion_Financiera.findAll({
        order: [["fecha_transaccion", "DESC"]],
        limit: 100
      });  

      const gastosPorMes = await Transaccion_Financiera.findAll({
        attributes: [
          [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("fecha_transaccion")), "mes"],
          [Sequelize.fn("SUM", Sequelize.col("monto_total")), "total_mes"]
        ],
        group: ["mes"],
        order: [["mes", "DESC"]],
        limit: 6
      });

      return {
        pedidos: {
          pendientes: pedidosPendientes,
          enProceso: pedidosEnProceso
        },
        herramientas: {
          enUso: herramientasEnUso
        },
        transacciones: {
          recientes: transaccionesRecientes,
          gastosPorMes: gastosPorMes
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
        detalle: ch.Herramienta 
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
