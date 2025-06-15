import { Tipo_Mantenimiento } from "./Tipo_Mantenimiento.js";

class TipoMantenimientoService {
  async getAll() {
    try {
      return await Tipo_Mantenimiento.findAll();
    } catch (error) {
      throw new Error("Error al obtener los tipos de mantenimiento: " + error.message);
    }
  }

  async getById(id) {
    try {
      const tipo = await Tipo_Mantenimiento.findByPk(id);
      if (!tipo) throw new Error("Tipo de mantenimiento no encontrado");
      return tipo;
    } catch (error) {
      throw new Error("Error al obtener el tipo de mantenimiento: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Tipo_Mantenimiento.create(data);
    } catch (error) {
      throw new Error("Error al crear el tipo de mantenimiento: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const tipo = await Tipo_Mantenimiento.findByPk(id);
      if (!tipo) throw new Error("Tipo de mantenimiento no encontrado");
      await tipo.update(data);
      return tipo;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de mantenimiento: " + error.message);
    }
  }

  async delete(id) {
    try {
      const tipo = await Tipo_Mantenimiento.findByPk(id);
      if (!tipo) throw new Error("Tipo de mantenimiento no encontrado");
      await tipo.destroy();
      return { message: "Tipo de mantenimiento eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el tipo de mantenimiento: " + error.message);
    }
  }
}

export const tipoMantenimientoService = new TipoMantenimientoService();