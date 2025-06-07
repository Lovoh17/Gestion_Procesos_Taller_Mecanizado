import { detalleTransaccionService } from "./Detalle_Transaccion.service.js";

export const crearDetalleTransaccion = async (req, res) => {
  try {
    const nuevoDetalle = await detalleTransaccionService.create(req.body);
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerDetallesTransaccion = async (req, res) => {
  try {
    const detalles = await detalleTransaccionService.getAll();
    res.status(200).json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDetalleTransaccionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await detalleTransaccionService.getById(id);
    res.status(200).json(detalle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerDetalleTransaccionPorConcepto = async (req, res) => {
  try {
    const { concepto } = req.params;
    const detalles = await detalleTransaccionService.getByConcepto(concepto);
    res.status(200).json(detalles);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarDetalleTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const detalleActualizado = await detalleTransaccionService.update(id, req.body);
    res.status(200).json(detalleActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarDetalleTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    await detalleTransaccionService.delete(id);
    res.status(200).json({ message: "Detalle de transacción eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};