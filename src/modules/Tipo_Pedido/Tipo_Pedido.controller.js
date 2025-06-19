import { tipoPedidoService } from "./Tipo_Pedido.service.js";

export const crearTipoPedido = async (req, res) => {
    try {
        const { nombre, descripcion, requiere_aprobacion} = req.body;
        const nuevoTipoPedido = await tipoPedidoService.create({
            nombre,
            descripcion,
            requiere_aprobacion
        });
        res.status(201).json(nuevoTipoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTipoPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoPedido = await tipoPedidoService.getById(id);
        res.status(200).json(tipoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoPedidoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const tipoPedido = await tipoPedidoService.getByName(nombre);
        res.status(200).json(tipoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTipoPedido = async (req, res) => {
    try {
        const tipoPedido = await tipoPedidoService.getAll();
        res.status(200).json(tipoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarTipoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, requiere_aprobacion } = req.body;
        const tipoPedidoActualizado = await tipoPedidoService.update(id, {
            nombre,
            descripcion,
            requiere_aprobacion
        });
        res.status(200).json(tipoPedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarTipoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        await tipoPedidoService.delete(id);
        res.status(200).json({ message: "Tipo de pedido eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}