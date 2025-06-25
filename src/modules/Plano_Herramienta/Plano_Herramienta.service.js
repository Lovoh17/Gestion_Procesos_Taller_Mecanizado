import { PlanoHerramienta } from "./Plano_Herramienta.js";

class PlanoHerramientaService {
  async getAll() {
    try {
      return await PlanoHerramienta.findAll();
    } catch (error) {
      throw new Error("Error al obtener los planos-herramienta: " + error.message);
    }
  }

  async getById(id) {
    try {
      const registro = await PlanoHerramienta.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      return registro;
    } catch (error) {
      throw new Error("Error al obtener el registro: " + error.message);
    }
  }

  async create(data) {
    try {
      return await PlanoHerramienta.create(data);
    } catch (error) {
      throw new Error("Error al crear el registro: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const registro = await PlanoHerramienta.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.update(data);
      return registro;
    } catch (error) {
      throw new Error("Error al actualizar el registro: " + error.message);
    }
  }

  async delete(id) {
    try {
      const registro = await PlanoHerramienta.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.destroy();
      return { message: "Registro eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el registro: " + error.message);
    }
  }
}

export const planoHerramientaService = new PlanoHerramientaService();