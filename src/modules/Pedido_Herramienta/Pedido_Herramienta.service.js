import { Pedido_Herramienta } from "./Pedido_Herramienta.js";
import { Op } from "sequelize";

class PedidoHerramientaService {
  async getAll() {
    try {
      return await Pedido_Herramienta.findAll();
    } catch (error) {
      throw new Error("Error al obtener los pedidos de herramienta: " + error.message);
    }
  }

  async getById(id) {
    try {
      const pedidoHerramienta = await Pedido_Herramienta.findByPk(id);
      if (!pedidoHerramienta) throw new Error("Pedido de herramienta no encontrado");
      return pedidoHerramienta;
    } catch (error) {
      throw new Error("Error al obtener el pedido de herramienta: " + error.message);
    }
  }

  async getByNotas(notas) {
    try {
      const pedidos = await Pedido_Herramienta.findAll({
        where: {
          notas: { [Op.iLike]: `%${notas}%` }
        }
      });
      if (!pedidos || pedidos.length === 0) throw new Error("No se encontraron pedidos con esas notas");
      return pedidos;
    } catch (error) {
      throw new Error("Error al buscar por notas: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Pedido_Herramienta.create(data);
    } catch (error) {
      throw new Error("Error al crear el pedido de herramienta: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const pedidoHerramienta = await Pedido_Herramienta.findByPk(id);
      if (!pedidoHerramienta) throw new Error("Pedido de herramienta no encontrado");
      await pedidoHerramienta.update(data);
      return pedidoHerramienta;
    } catch (error) {
      throw new Error("Error al actualizar el pedido de herramienta: " + error.message);
    }
  }

  async delete(id) {
    try {
      const pedidoHerramienta = await Pedido_Herramienta.findByPk(id);
      if (!pedidoHerramienta) throw new Error("Pedido de herramienta no encontrado");
      await pedidoHerramienta.destroy();
      return { message: "Pedido de herramienta eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el pedido de herramienta: " + error.message);
    }
  }
}

export const pedidoHerramientaService = new PedidoHerramientaService();