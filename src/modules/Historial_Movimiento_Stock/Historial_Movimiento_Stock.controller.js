import { historialMovimientoStockService } from "./Historial_Movimiento_Stock.service.js";

export const crearHistorialMovimientoStock = async (req, res) => {
  try {
    const nuevoHistorial = await historialMovimientoStockService.create(req.body);
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerHistorialesMovimientoStock = async (req, res) => {
  try {
    const historiales = await historialMovimientoStockService.getAll();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerHistorialMovimientoStockPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await historialMovimientoStockService.getById(id);
    res.status(200).json(historial);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarHistorialMovimientoStock = async (req, res) => {
  try {
    const { id } = req.params;
    const historialActualizado = await historialMovimientoStockService.update(id, req.body);
    res.status(200).json(historialActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarHistorialMovimientoStock = async (req, res) => {
  try {
    const { id } = req.params;
    await historialMovimientoStockService.delete(id);
    res.status(200).json({ message: "Registro de historial eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};