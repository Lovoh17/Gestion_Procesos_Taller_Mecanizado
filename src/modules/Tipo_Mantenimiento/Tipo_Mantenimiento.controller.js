import { tipoMantenimientoService } from "./Tipo_Mantenimiento.service.js";

export const crearTipoMantenimiento = async (req, res) => {
  try {
    const nuevoTipo = await tipoMantenimientoService.create(req.body);
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerTiposMantenimiento = async (req, res) => {
  try {
    const tipos = await tipoMantenimientoService.getAll();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTipoMantenimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await tipoMantenimientoService.getById(id);
    res.status(200).json(tipo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarTipoMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoActualizado = await tipoMantenimientoService.update(id, req.body);
    res.status(200).json(tipoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarTipoMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await tipoMantenimientoService.delete(id);
    res.status(200).json({ message: "Tipo de mantenimiento eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};