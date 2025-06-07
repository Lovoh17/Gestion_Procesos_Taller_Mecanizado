import { alertaReparacionService } from "./Alerta_Reparacion.service.js";

export const crearAlertaReparacion = async (req, res) => {
  try {
    const nuevaAlerta = await alertaReparacionService.create(req.body);
    res.status(201).json(nuevaAlerta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerAlertasReparacion = async (req, res) => {
  try {
    const alertas = await alertaReparacionService.getAll();
    res.status(200).json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerAlertaReparacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const alerta = await alertaReparacionService.getById(id);
    res.status(200).json(alerta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerAlertaReparacionPorDescripcion = async (req, res) => {
  try {
    const { descripcion } = req.params;
    const alertas = await alertaReparacionService.getByDescripcion(descripcion);
    res.status(200).json(alertas);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarAlertaReparacion = async (req, res) => {
  try {
    const { id } = req.params;
    const alertaActualizada = await alertaReparacionService.update(id, req.body);
    res.status(200).json(alertaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarAlertaReparacion = async (req, res) => {
  try {
    const { id } = req.params;
    await alertaReparacionService.delete(id);
    res.status(200).json({ message: "Alerta eliminada" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};