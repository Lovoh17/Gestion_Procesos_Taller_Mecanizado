import { prioridadMantenimientoService } from "./Prioridad_Mantenimiento.service.js";

export const crearPrioridadMantenimiento = async (req, res) => {
  try {
    const nuevaPrioridad = await prioridadMantenimientoService.create(req.body);
    res.status(201).json(nuevaPrioridad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPrioridadesMantenimiento = async (req, res) => {
  try {
    const prioridades = await prioridadMantenimientoService.getAll();
    res.status(200).json(prioridades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPrioridadMantenimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const prioridad = await prioridadMantenimientoService.getById(id);
    res.status(200).json(prioridad);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPrioridadMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const prioridadActualizada = await prioridadMantenimientoService.update(id, req.body);
    res.status(200).json(prioridadActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPrioridadMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await prioridadMantenimientoService.delete(id);
    res.status(200).json({ message: "Prioridad de mantenimiento eliminada" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};