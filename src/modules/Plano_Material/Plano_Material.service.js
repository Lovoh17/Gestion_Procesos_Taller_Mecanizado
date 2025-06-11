import { PlanoMaterial } from "./Plano_Material.js";

class PlanoMaterialService {
  async getAll() {
    try {
      return await PlanoMaterial.findAll();
    } catch (error) {
      throw new Error("Error al obtener los planos-material: " + error.message);
    }
  }

  async getById(id) {
    try {
      const registro = await PlanoMaterial.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      return registro;
    } catch (error) {
      throw new Error("Error al obtener el registro: " + error.message);
    }
  }

  async create(data) {
    try {
      return await PlanoMaterial.create(data);
    } catch (error) {
      throw new Error("Error al crear el registro: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const registro = await PlanoMaterial.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.update(data);
      return registro;
    } catch (error) {
      throw new Error("Error al actualizar el registro: " + error.message);
    }
  }

  async delete(id) {
    try {
      const registro = await PlanoMaterial.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.destroy();
      return { message: "Registro eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el registro: " + error.message);
    }
  }
}

export const planoMaterialService = new PlanoMaterialService();