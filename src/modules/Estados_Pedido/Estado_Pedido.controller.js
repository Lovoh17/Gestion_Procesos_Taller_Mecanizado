import { estadoPedidoService } from "./Estados_Pedido.service.js";

export const crearEstadoPedido = async (req, res) => {
    try {
        const { nombre, descripcion, color_indicador, permite_edicion, orden_flujo } = req.body;
        const nuevoestadopedido = await estadoPedidoService.create({
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
        const estadopedido = await estadoPedidoService.getById(id);
        res.status(200).json(estadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoPedido = async (req, res) => {
    try {
        const estadopedido = await estadoPedidoService.getAll();
        res.status(200).json(estadopedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, color_indicador, permite_edicion, orden_flujo } = req.body;
        const actualizadoestadopedido = await estadoPedidoService.update(id,{
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
        await estadoPedidoService.delete(id);
        res.status(200).json({ message: "Estado pedido eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}