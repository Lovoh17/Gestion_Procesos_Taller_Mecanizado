import { Plano } from "./Plano.js";

class PlanoService {
  async getAll() {
    try {
      return await Plano.findAll();
    } catch (error) {
      throw new Error("Error al obtener los planos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const plano = await Plano.findByPk(id);
      if (!plano) throw new Error("Plano no encontrado");
      return plano;
    } catch (error) {
      throw new Error("Error al obtener el plano: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Plano.create(data);
    } catch (error) {
      throw new Error("Error al crear el plano: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const plano = await Plano.findByPk(id);
      if (!plano) throw new Error("Plano no encontrado");
      await plano.update(data);
      return plano;
    } catch (error) {
      throw new Error("Error al actualizar el plano: " + error.message);
    }
  }

  async delete(id) {
    try {
      const plano = await Plano.findByPk(id);
      if (!plano) throw new Error("Plano no encontrado");
      await plano.destroy();
      return { message: "Plano eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el plano: " + error.message);
    }
  }
}

export const planoService = new PlanoService();