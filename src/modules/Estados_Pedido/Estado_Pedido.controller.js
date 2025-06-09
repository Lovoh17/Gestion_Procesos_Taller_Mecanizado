import { EstadoPedidoService } from "./Estados_Pedido.service.js";

export const crearEstadoPedido = async (req, res) => {
    try {
        const { nombre, descripcion, color_indicador, permite_edicion, orden_flujo } = req.body;
        const nuevoestadopedido = await EstadoPedidoService.create({
            nombre,
            descripcion,
            color_indicador,
            permite_edicion,
            orden_flujo
        });
        res.status(200).json(nuevoestadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estadopedido = await EstadoPedidoService.getById(id);
        res.status(200).json(estadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoPedido = async (req, res) => {
    try {
        const estadopedido = await EstadoPedidoService.getAll();
        res.status(200).json(estadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, color_indicador, permite_edicion, orden_flujo } = req.body;
        const actualizadoestadopedido = await EstadoPedidoService.update(id,{
            nombre,
            descripcion,
            color_indicador,
            permite_edicion,
            orden_flujo
        });
        res.status(200).json(actualizadoestadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        await EstadoPedidoService.delete(id);
        res.status(200).json({ message: "Estado pedido eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}