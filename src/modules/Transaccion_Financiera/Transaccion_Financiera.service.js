import { Transaccion_Financiera } from "./Transaccion_Financiera.js";
import { Op } from "sequelize";

class TransaccionFinancieraService {
  async getAll() {
    try {
      return await Transaccion_Financiera.findAll();
    } catch (error) {
      throw new Error("Error al obtener las transacciones: " + error.message);
    }
  }

  async getById(id) {
    try {
      const transaccion = await Transaccion_Financiera.findByPk(id);
      if (!transaccion) throw new Error("Transacción no encontrada");
      return transaccion;
    } catch (error) {
      throw new Error("Error al obtener la transacción: " + error.message);
    }
  }

  async getByDescripcion(descripcion) {
    try {
      const transacciones = await Transaccion_Financiera.findAll({
        where: {
          descripcion: { [Op.iLike]: `%${descripcion}%` }
        }
      });
      if (!transacciones || transacciones.length === 0) throw new Error("No se encontraron transacciones con esa descripción");
      return transacciones;
    } catch (error) {
      throw new Error("Error al buscar por descripción: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Transaccion_Financiera.create(data);
    } catch (error) {
      throw new Error("Error al crear la transacción: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const transaccion = await Transaccion_Financiera.findByPk(id);
      if (!transaccion) throw new Error("Transacción no encontrada");
      await transaccion.update(data);
      return transaccion;
    } catch (error) {
      throw new Error("Error al actualizar la transacción: " + error.message);
    }
  }

  async delete(id) {
    try {
      const transaccion = await Transaccion_Financiera.findByPk(id);
      if (!transaccion) throw new Error("Transacción no encontrada");
      await transaccion.destroy();
      return { message: "Transacción eliminada" };
    } catch (error) {
      throw new Error("Error al eliminar la transacción: " + error.message);
    }
  }
}

export const transaccionFinancieraService = new TransaccionFinancieraService();