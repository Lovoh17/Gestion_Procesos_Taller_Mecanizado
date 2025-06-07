import { historialPedidoService } from "./Historial_Pedido.service.js";

export const crearHistorialPedido = async (req, res) => {
  try {
    const nuevoHistorial = await historialPedidoService.create(req.body);
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerHistorialPedidos = async (req, res) => {
  try {
    const registros = await historialPedidoService.getAll();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerHistorialPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await historialPedidoService.getById(id);
    res.status(200).json(registro);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerHistorialPedidoPorDescripcion = async (req, res) => {
  try {
    const { descripcion } = req.params;
    const registros = await historialPedidoService.getByDescripcion(descripcion);
    res.status(200).json(registros);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarHistorialPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await historialPedidoService.update(id, req.body);
    res.status(200).json(registroActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarHistorialPedido = async (req, res) => {
  try {
    const { id } = req.params;
    await historialPedidoService.delete(id);
    res.status(200).json({ message: "Registro de historial eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};