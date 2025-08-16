import { pedidoMaterialService } from "./Pedido_Material.service.js";

export const crearPedidoMaterial = async (req, res) => {
  try {
    const nuevoPedido = await pedidoMaterialService.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPedidosMaterial = async (req, res) => {
  try {
    const pedidos = await pedidoMaterialService.getAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPedidoMaterialPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoMaterialService.getById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerPedidoMaterialPorNotas = async (req, res) => {
  try {
    const { notas } = req.params;
    const pedidos = await pedidoMaterialService.getByNotas(notas);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPedidoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizado = await pedidoMaterialService.update(id, req.body);
    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPedidoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoMaterialService.delete(id);
    res.status(200).json({ message: "Pedido de material eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};