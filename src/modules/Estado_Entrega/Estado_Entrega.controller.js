import { EstadoEntregaService } from "./Estado_Entrega.service.js";

export const crearEstadoEntrega = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaEstadoEntrega = await EstadoEntregaService.create({
            nombre,
            descripcion,
        });
        res.status(200).json(nuevaEstadoEntrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoEntregaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estado_entrega = await EstadoEntregaService.getById(id);
        res.status(200).json(estado_entrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerEstadoEntrega = async (req, res) => {
    try {
        const estado_entrega = await EstadoEntregaService.getAll();
        res.status(200).json(estado_entrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarEstadoEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion} = req.body;
        const estado_entrega = await EstadoEntregaService.update(id, {
            nombre,
            descripcion,
        });
        res.status(200).json(estado_entrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarEstadoEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        await EstadoEntregaService.delete(id);
        res.status(200).json({ message: "Estado entrega eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
