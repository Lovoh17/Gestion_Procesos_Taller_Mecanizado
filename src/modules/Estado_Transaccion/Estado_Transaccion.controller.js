import { EstadoTransaccionService } from "./Estado_Transaccion.service.js";

export const crearEstadoTransaccion = async (req, res) => {
    try {
        const { nombre_estado  } = req.body;
        const nuevaEstadoTransaccion = await EstadoTransaccionService.create({
            nombre_estado
        });
        res.status(201).json(nuevaEstadoTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoTransaccionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estado_transaccion = await EstadoTransaccionService.getById(id);
        res.status(200).json(estado_transaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerEstadoTransaccion = async (req, res) => {
    try {
        const estado_transaccion = await EstadoTransaccionService.getAll();
        res.status(200).json(estado_transaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarEstadoTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_estado } = req.body;
        const estadoTransaccionActualizada = await EstadoTransaccionService.update(id, {
            nombre_estado
        });
        res.status(200).json(estadoTransaccionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarZonaTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        await EstadoTransaccionService.delete(id);
        res.status(200).json({ message: "Estado Transaccion eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}