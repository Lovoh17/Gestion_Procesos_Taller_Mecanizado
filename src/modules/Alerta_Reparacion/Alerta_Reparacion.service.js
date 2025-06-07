import { Alerta_Reparacion } from "./Alerta_Reparacion.js";
import { Op } from "sequelize";

class AlertaReparacionService {
  async getAll() {
    try {
      return await Alerta_Reparacion.findAll();
    } catch (error) {
      throw new Error("Error al obtener las alertas: " + error.message);
    }
  }

  async getById(id) {
    try {
      const alerta = await Alerta_Reparacion.findByPk(id);
      if (!alerta) throw new Error("Alerta no encontrada");
      return alerta;
    } catch (error) {
      throw new Error("Error al obtener la alerta: " + error.message);
    }
  }

  async getByDescripcion(descripcion) {
    try {
      const alertas = await Alerta_Reparacion.findAll({
        where: {
          descripcion: { [Op.iLike]: `%${descripcion}%` }
        }
      });
      if (!alertas || alertas.length === 0) throw new Error("No se encontraron alertas con esa descripción");
      return alertas;
    } catch (error) {
      throw new Error("Error al buscar por descripción: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Alerta_Reparacion.create(data);
    } catch (error) {
      throw new Error("Error al crear la alerta: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const alerta = await Alerta_Reparacion.findByPk(id);
      if (!alerta) throw new Error("Alerta no encontrada");
      await alerta.update(data);
      return alerta;
    } catch (error) {
      throw new Error("Error al actualizar la alerta: " + error.message);
    }
  }

  async delete(id) {
    try {
      const alerta = await Alerta_Reparacion.findByPk(id);
      if (!alerta) throw new Error("Alerta no encontrada");
      await alerta.destroy();
      return { message: "Alerta eliminada" };
    } catch (error) {
      throw new Error("Error al eliminar la alerta: " + error.message);
    }
  }
}

export const alertaReparacionService = new AlertaReparacionService();