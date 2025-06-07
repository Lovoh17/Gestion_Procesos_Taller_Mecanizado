import { Pedido_Material } from "./Pedido_Material.js";
import { Op } from "sequelize";

class PedidoMaterialService {
  async getAll() {
    try {
      return await Pedido_Material.findAll();
    } catch (error) {
      throw new Error("Error al obtener los pedidos de material: " + error.message);
    }
  }

  async getById(id) {
    try {
      const pedidoMaterial = await Pedido_Material.findByPk(id);
      if (!pedidoMaterial) throw new Error("Pedido de material no encontrado");
      return pedidoMaterial;
    } catch (error) {
      throw new Error("Error al obtener el pedido de material: " + error.message);
    }
  }

  async getByNotas(notas) {
    try {
      const pedidos = await Pedido_Material.findAll({
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
      return await Pedido_Material.create(data);
    } catch (error) {
      throw new Error("Error al crear el pedido de material: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const pedidoMaterial = await Pedido_Material.findByPk(id);
      if (!pedidoMaterial) throw new Error("Pedido de material no encontrado");
      await pedidoMaterial.update(data);
      return pedidoMaterial;
    } catch (error) {
      throw new Error("Error al actualizar el pedido de material: " + error.message);
    }
  }

  async delete(id) {
    try {
      const pedidoMaterial = await Pedido_Material.findByPk(id);
      if (!pedidoMaterial) throw new Error("Pedido de material no encontrado");
      await pedidoMaterial.destroy();
      return { message: "Pedido de material eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el pedido de material: " + error.message);
    }
  }
}

export const pedidoMaterialService = new PedidoMaterialService();