import { Prioridad_Mantenimiento } from "./Prioridad_Mantenimiento.js";

class PrioridadMantenimientoService {
  async getAll() {
    try {
      return await Prioridad_Mantenimiento.findAll();
    } catch (error) {
      throw new Error("Error al obtener las prioridades de mantenimiento: " + error.message);
    }
  }

  async getById(id) {
    try {
      const prioridad = await Prioridad_Mantenimiento.findByPk(id);
      if (!prioridad) throw new Error("Prioridad de mantenimiento no encontrada");
      return prioridad;
    } catch (error) {
      throw new Error("Error al obtener la prioridad de mantenimiento: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Prioridad_Mantenimiento.create(data);
    } catch (error) {
      throw new Error("Error al crear la prioridad de mantenimiento: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const prioridad = await Prioridad_Mantenimiento.findByPk(id);
      if (!prioridad) throw new Error("Prioridad de mantenimiento no encontrada");
      await prioridad.update(data);
      return prioridad;
    } catch (error) {
      throw new Error("Error al actualizar la prioridad de mantenimiento: " + error.message);
    }
  }

  async delete(id) {
    try {
      const prioridad = await Prioridad_Mantenimiento.findByPk(id);
      if (!prioridad) throw new Error("Prioridad de mantenimiento no encontrada");
      await prioridad.destroy();
      return { message: "Prioridad de mantenimiento eliminada" };
    } catch (error) {
      throw new Error("Error al eliminar la prioridad de mantenimiento: " + error.message);
    }
  }
}

export const prioridadMantenimientoService = new PrioridadMantenimientoService();