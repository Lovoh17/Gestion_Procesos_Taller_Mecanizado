import { Detalle_Transaccion } from "./Detalle_Transaccion.js";
import { Op } from "sequelize";

class DetalleTransaccionService {
  async getAll() {
    try {
      return await Detalle_Transaccion.findAll();
    } catch (error) {
      throw new Error("Error al obtener los detalles de transacción: " + error.message);
    }
  }

  async getById(id) {
    try {
      const detalle = await Detalle_Transaccion.findByPk(id);
      if (!detalle) throw new Error("Detalle de transacción no encontrado");
      return detalle;
    } catch (error) {
      throw new Error("Error al obtener el detalle de transacción: " + error.message);
    }
  }

  async getByConcepto(concepto) {
    try {
      const detalles = await Detalle_Transaccion.findAll({
        where: {
          concepto: { [Op.iLike]: `%${concepto}%` }
        }
      });
      if (!detalles || detalles.length === 0) throw new Error("No se encontraron detalles con ese concepto");
      return detalles;
    } catch (error) {
      throw new Error("Error al buscar por concepto: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Detalle_Transaccion.create(data);
    } catch (error) {
      throw new Error("Error al crear el detalle de transacción: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const detalle = await Detalle_Transaccion.findByPk(id);
      if (!detalle) throw new Error("Detalle de transacción no encontrado");
      await detalle.update(data);
      return detalle;
    } catch (error) {
      throw new Error("Error al actualizar el detalle de transacción: " + error.message);
    }
  }

  async delete(id) {
    try {
      const detalle = await Detalle_Transaccion.findByPk(id);
      if (!detalle) throw new Error("Detalle de transacción no encontrado");
      await detalle.destroy();
      return { message: "Detalle de transacción eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el detalle de transacción: " + error.message);
    }
  }
}

export const detalleTransaccionService = new DetalleTransaccionService();