import { Entrega_Pedido } from "./Entrega_Pedido.js";
import { Op } from "sequelize";

class EntregaPedidoService {
  async getAll() {
    try {
      return await Entrega_Pedido.findAll();
    } catch (error) {
      throw new Error("Error al obtener las entregas: " + error.message);
    }
  }

  async getById(id) {
    try {
      const entrega = await Entrega_Pedido.findByPk(id);
      if (!entrega) throw new Error("Entrega no encontrada");
      return entrega;
    } catch (error) {
      throw new Error("Error al obtener la entrega: " + error.message);
    }
  }

  async getByNotas(notas) {
    try {
      const entregas = await Entrega_Pedido.findAll({
        where: {
          notas: { [Op.iLike]: `%${notas}%` }
        }
      });
      if (!entregas || entregas.length === 0) throw new Error("No se encontraron entregas con esas notas");
      return entregas;
    } catch (error) {
      throw new Error("Error al buscar por notas: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Entrega_Pedido.create(data);
    } catch (error) {
      throw new Error("Error al crear la entrega: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const entrega = await Entrega_Pedido.findByPk(id);
      if (!entrega) throw new Error("Entrega no encontrada");
      await entrega.update(data);
      return entrega;
    } catch (error) {
      throw new Error("Error al actualizar la entrega: " + error.message);
    }
  }

  async delete(id) {
    try {
      const entrega = await Entrega_Pedido.findByPk(id);
      if (!entrega) throw new Error("Entrega no encontrada");
      await entrega.destroy();
      return { message: "Entrega eliminada" };
    } catch (error) {
      throw new Error("Error al eliminar la entrega: " + error.message);
    }
  }
}

export const entregaPedidoService = new EntregaPedidoService();