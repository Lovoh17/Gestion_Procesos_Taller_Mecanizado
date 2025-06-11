import { Estado_Mantenimiento } from "./Estado_Mantenimiento.js";

class EstadoMantenimientoService {
  async getAll() {
    try {
      return await Estado_Mantenimiento.findAll();
    } catch (error) {
      throw new Error("Error al obtener los estados de mantenimiento: " + error.message);
    }
  }

  async getById(id) {
    try {
      const estado = await Estado_Mantenimiento.findByPk(id);
      if (!estado) throw new Error("Estado de mantenimiento no encontrado");
      return estado;
    } catch (error) {
      throw new Error("Error al obtener el estado de mantenimiento: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Estado_Mantenimiento.create(data);
    } catch (error) {
      throw new Error("Error al crear el estado de mantenimiento: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const estado = await Estado_Mantenimiento.findByPk(id);
      if (!estado) throw new Error("Estado de mantenimiento no encontrado");
      await estado.update(data);
      return estado;
    } catch (error) {
      throw new Error("Error al actualizar el estado de mantenimiento: " + error.message);
    }
  }

  async delete(id) {
    try {
      const estado = await Estado_Mantenimiento.findByPk(id);
      if (!estado) throw new Error("Estado de mantenimiento no encontrado");
      await estado.destroy();
      return { message: "Estado de mantenimiento eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el estado de mantenimiento: " + error.message);
    }
  }
}

export const estadoMantenimientoService = new EstadoMantenimientoService();