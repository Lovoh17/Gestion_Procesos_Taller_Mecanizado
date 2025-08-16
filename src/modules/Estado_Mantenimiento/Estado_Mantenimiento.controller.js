import { estadoMantenimientoService } from "./Estado_Mantenimiento.service.js";

export const crearEstadoMantenimiento = async (req, res) => {
  try {
    const nuevoEstado = await estadoMantenimientoService.create(req.body);
    res.status(201).json(nuevoEstado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerEstadosMantenimiento = async (req, res) => {
  try {
    const estados = await estadoMantenimientoService.getAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEstadoMantenimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const estado = await estadoMantenimientoService.getById(id);
    res.status(200).json(estado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarEstadoMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const estadoActualizado = await estadoMantenimientoService.update(id, req.body);
    res.status(200).json(estadoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarEstadoMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await estadoMantenimientoService.delete(id);
    res.status(200).json({ message: "Estado de mantenimiento eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};