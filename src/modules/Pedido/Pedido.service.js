import { Pedido } from "./Pedido.js";

class PedidoService {
  async getAll() {
    try {
      return await Pedido.findAll();
    } catch (error) {
      throw new Error("Error al obtener los pedidos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) throw new Error("Pedido no encontrado");
      return pedido;
    } catch (error) {
      throw new Error("Error al obtener el pedido: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Pedido.create(data);
    } catch (error) {
      throw new Error("Error al crear el pedido: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) throw new Error("Pedido no encontrado");
      await pedido.update(data);
      return pedido;
    } catch (error) {
      throw new Error("Error al actualizar el pedido: " + error.message);
    }
  }

  async delete(id) {
    try {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) throw new Error("Pedido no encontrado");
      await pedido.destroy();
      return { message: "Pedido eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el pedido: " + error.message);
    }
  }
}

export const pedidoService = new PedidoService();