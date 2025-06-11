import { pedidoService } from "./Pedido.service.js";

export const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = await pedidoService.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizado = await pedidoService.update(id, req.body);
    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoService.delete(id);
    res.status(200).json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};