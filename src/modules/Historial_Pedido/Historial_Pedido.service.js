import { Historial_Pedido } from "./Historial_Pedido.js";
import { Op } from "sequelize";

class HistorialPedidoService {
  async getAll() {
    try {
      return await Historial_Pedido.findAll();
    } catch (error) {
      throw new Error("Error al obtener el historial de pedidos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const historial = await Historial_Pedido.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      return historial;
    } catch (error) {
      throw new Error("Error al obtener el historial: " + error.message);
    }
  }

  async getByDescripcion(descripcion) {
    try {
      const registros = await Historial_Pedido.findAll({
        where: {
          descripcion: { [Op.iLike]: `%${descripcion}%` }
        }
      });
      if (!registros || registros.length === 0) throw new Error("No se encontraron registros con esa descripción");
      return registros;
    } catch (error) {
      throw new Error("Error al buscar por descripción: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Historial_Pedido.create(data);
    } catch (error) {
      throw new Error("Error al crear el historial: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const historial = await Historial_Pedido.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      await historial.update(data);
      return historial;
    } catch (error) {
      throw new Error("Error al actualizar el historial: " + error.message);
    }
  }

  async delete(id) {
    try {
      const historial = await Historial_Pedido.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      await historial.destroy();
      return { message: "Registro de historial eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el historial: " + error.message);
    }
  }
}

export const historialPedidoService = new HistorialPedidoService();