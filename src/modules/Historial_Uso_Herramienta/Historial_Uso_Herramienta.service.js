import { Historial_Uso_Herramientas } from "./Historial_Uso_Herramienta.js";
import { Op } from "sequelize";

class HistorialUsoHerramientasService {
  async getAll() {
    try {
      return await Historial_Uso_Herramientas.findAll();
    } catch (error) {
      throw new Error("Error al obtener el historial: " + error.message);
    }
  }

  async getById(id) {
    try {
      const registro = await Historial_Uso_Herramientas.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      return registro;
    } catch (error) {
      throw new Error("Error al obtener el registro: " + error.message);
    }
  }

  async getByNotas(notas) {
    try {
      const registros = await Historial_Uso_Herramientas.findAll({
        where: {
          notas: { [Op.iLike]: `%${notas}%` }
        }
      });
      if (!registros || registros.length === 0) throw new Error("No se encontraron registros con esas notas");
      return registros;
    } catch (error) {
      throw new Error("Error al buscar por notas: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Historial_Uso_Herramientas.create(data);
    } catch (error) {
      throw new Error("Error al crear el registro: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const registro = await Historial_Uso_Herramientas.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.update(data);
      return registro;
    } catch (error) {
      throw new Error("Error al actualizar el registro: " + error.message);
    }
  }

  async delete(id) {
    try {
      const registro = await Historial_Uso_Herramientas.findByPk(id);
      if (!registro) throw new Error("Registro no encontrado");
      await registro.destroy();
      return { message: "Registro eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el registro: " + error.message);
    }
  }
}

export const historialUsoHerramientasService = new HistorialUsoHerramientasService();