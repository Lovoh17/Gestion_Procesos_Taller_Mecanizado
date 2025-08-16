import { pedidoHerramientaService } from "./Pedido_Herramienta.service.js";

export const crearPedidoHerramienta = async (req, res) => {
  try {
    const nuevoPedido = await pedidoHerramientaService.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPedidosHerramienta = async (req, res) => {
  try {
    const pedidos = await pedidoHerramientaService.getAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPedidoHerramientaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoHerramientaService.getById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerPedidoHerramientaPorNotas = async (req, res) => {
  try {
    const { notas } = req.params;
    const pedidos = await pedidoHerramientaService.getByNotas(notas);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPedidoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizado = await pedidoHerramientaService.update(id, req.body);
    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPedidoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoHerramientaService.delete(id);
    res.status(200).json({ message: "Pedido de herramienta eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};