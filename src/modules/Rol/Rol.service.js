import { Rol } from "./Rol.js";

class RolService {
  async getAll() {
    try {
      return await Rol.findAll();
    } catch (error) {
      throw new Error("Error al obtener los roles: " + error.message);
    }
  }

  async getById(id) {
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) throw new Error("Rol no encontrado");
      return rol;
    } catch (error) {
      throw new Error("Error al obtener el rol: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Rol.create(data);
    } catch (error) {
      throw new Error("Error al crear el rol: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) throw new Error("Rol no encontrado");
      await rol.update(data);
      return rol;
    } catch (error) {
      throw new Error("Error al actualizar el rol: " + error.message);
    }
  }

  async delete(id) {
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) throw new Error("Rol no encontrado");
      await rol.destroy();
      return { message: "Rol eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el rol: " + error.message);
    }
  }
}

export const rolService = new RolService();