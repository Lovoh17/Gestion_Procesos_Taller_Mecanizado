import { Usuario } from "../Usuario/Usuario.js";
import { Pedido } from "../Pedido/Pedido.js";
import { Herramienta } from "../Herramienta/Herramienta.js";
import { Estado_Pedido } from "../Estado_Pedido/Estado_Pedido.js";
import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";
import { Puesto } from "../Puesto/Puesto.js";
import { Sequelize } from "sequelize";

class DashboardService {
  async getAdminDashboard() {
    try {
      const usuariosPorPuesto = await Usuario.findAll({
        attributes: [
          "puesto_id",
          [Sequelize.fn("COUNT", Sequelize.col("Usuario.id")), "total"]
        ],
        include: [{ model: Puesto, attributes: ["nombre"] }],
        group: ["puesto_id", "Puesto.id"]
      });

      const pedidosPorEstado = await Pedido.findAll({
        attributes: ["estado_id", [Sequelize.fn("COUNT", Sequelize.col("id")), "total"]],
        group: ["estado_id"],
        include: [{ model: Estado_Pedido, attributes: ["nombre"] }]
      });

      const herramientasPorEstado = await Herramienta.findAll({
        attributes: [
          "estado_herramienta_id",
          [Sequelize.fn("COUNT", Sequelize.col("Herramienta.id")), "total"]
        ],
        include: [{ model: Estado_Herramienta, attributes: ["nombre"] }],
        group: ["estado_herramienta_id", "Estado_Herramienta.id"]
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
      const estadoPendiente = await Estado_Pedido.findOne({ where: { nombre: "pendiente" } });
      const estadoProceso   = await Estado_Pedido.findOne({ where: { nombre: "en proceso" } });
      const estadoUso       = await Estado_Herramienta.findOne({ where: { nombre: "uso" } });

      const pedidosPendientes = await Pedido.count({ where: { estado_id: estadoPendiente?.id } });
      const pedidosEnProceso  = await Pedido.count({ where: { estado_id: estadoProceso?.id } });
      const herramientasEnUso = await Herramienta.count({ where: { estado_herramienta_id: estadoUso?.id } });

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
}

export const dashboardService = new DashboardService();
