import { detalleEntregaService } from "./Detalle_Entrega.service.js";

export const crearDetalleEntrega = async (req, res) => {
  try {
    const nuevoDetalle = await detalleEntregaService.create(req.body);
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerDetallesEntrega = async (req, res) => {
  try {
    const detalles = await detalleEntregaService.getAll();
    res.status(200).json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDetalleEntregaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await detalleEntregaService.getById(id);
    res.status(200).json(detalle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerDetalleEntregaPorNotas = async (req, res) => {
  try {
    const { notas } = req.params;
    const detalles = await detalleEntregaService.getByNotas(notas);
    res.status(200).json(detalles);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarDetalleEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const detalleActualizado = await detalleEntregaService.update(id, req.body);
    res.status(200).json(detalleActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarDetalleEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    await detalleEntregaService.delete(id);
    res.status(200).json({ message: "Detalle de entrega eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};