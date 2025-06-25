import { Detalle_Entrega } from "./Detalle_Entrega.js";
import { Op } from "sequelize";

class DetalleEntregaService {
  async getAll() {
    try {
      return await Detalle_Entrega.findAll();
    } catch (error) {
      throw new Error("Error al obtener los detalles de entrega: " + error.message);
    }
  }

  async getById(id) {
    try {
      const detalle = await Detalle_Entrega.findByPk(id);
      if (!detalle) throw new Error("Detalle de entrega no encontrado");
      return detalle;
    } catch (error) {
      throw new Error("Error al obtener el detalle de entrega: " + error.message);
    }
  }

  async getByNotas(notas) {
    try {
      const detalles = await Detalle_Entrega.findAll({
        where: {
          notas: { [Op.iLike]: `%${notas}%` }
        }
      });
      if (!detalles || detalles.length === 0) throw new Error("No se encontraron detalles con esas notas");
      return detalles;
    } catch (error) {
      throw new Error("Error al buscar por notas: " + error.message);
    }
  }

  async create(data) {
    try {
      return await Detalle_Entrega.create(data);
    } catch (error) {
      throw new Error("Error al crear el detalle de entrega: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const detalle = await Detalle_Entrega.findByPk(id);
      if (!detalle) throw new Error("Detalle de entrega no encontrado");
      await detalle.update(data);
      return detalle;
    } catch (error) {
      throw new Error("Error al actualizar el detalle de entrega: " + error.message);
    }
  }

  async delete(id) {
    try {
      const detalle = await Detalle_Entrega.findByPk(id);
      if (!detalle) throw new Error("Detalle de entrega no encontrado");
      await detalle.destroy();
      return { message: "Detalle de entrega eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el detalle de entrega: " + error.message);
    }
  }
}

export const detalleEntregaService = new DetalleEntregaService();