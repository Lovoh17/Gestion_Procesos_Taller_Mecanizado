import { entregaPedidoService } from "./Entrega_Pedido.service.js";

export const crearEntregaPedido = async (req, res) => {
  try {
    const nuevaEntrega = await entregaPedidoService.create(req.body);
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerEntregasPedido = async (req, res) => {
  try {
    const entregas = await entregaPedidoService.getAll();
    res.status(200).json(entregas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEntregaPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const entrega = await entregaPedidoService.getById(id);
    res.status(200).json(entrega);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerEntregaPedidoPorNotas = async (req, res) => {
  try {
    const { notas } = req.params;
    const entregas = await entregaPedidoService.getByNotas(notas);
    res.status(200).json(entregas);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarEntregaPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const entregaActualizada = await entregaPedidoService.update(id, req.body);
    res.status(200).json(entregaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarEntregaPedido = async (req, res) => {
  try {
    const { id } = req.params;
    await entregaPedidoService.delete(id);
    res.status(200).json({ message: "Entrega eliminada" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};