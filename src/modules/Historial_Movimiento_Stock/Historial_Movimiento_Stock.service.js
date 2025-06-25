import { HistorialMovimientoStock } from "./Historial_Movimiento_Stock.js";

class HistorialMovimientoStockService {
  async getAll() {
    try {
      return await HistorialMovimientoStock.findAll();
    } catch (error) {
      throw new Error("Error al obtener el historial de movimientos de stock: " + error.message);
    }
  }

  async getById(id) {
    try {
      const historial = await HistorialMovimientoStock.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      return historial;
    } catch (error) {
      throw new Error("Error al obtener el historial: " + error.message);
    }
  }

  async create(data) {
    try {
      return await HistorialMovimientoStock.create(data);
    } catch (error) {
      throw new Error("Error al crear el historial: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const historial = await HistorialMovimientoStock.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      await historial.update(data);
      return historial;
    } catch (error) {
      throw new Error("Error al actualizar el historial: " + error.message);
    }
  }

  async delete(id) {
    try {
      const historial = await HistorialMovimientoStock.findByPk(id);
      if (!historial) throw new Error("Registro de historial no encontrado");
      await historial.destroy();
      return { message: "Registro de historial eliminado" };
    } catch (error) {
      throw new Error("Error al eliminar el historial: " + error.message);
    }
  }
}

export const historialMovimientoStockService = new HistorialMovimientoStockService();