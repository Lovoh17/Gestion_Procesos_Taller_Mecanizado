import { TipoTransaccionService } from "./Tipos_Transaccion.service.js";

export const crearTipoTransaccion = async (req, res) => {
    try {
        const { nombre, descripcion, afecta_ingresos, afecta_gastos, es_interno } = req.body;
        const nuevaTipoTransaccion = await TipoTransaccionService.create({
            nombre,
            descripcion,
            afecta_ingresos,
            afecta_gastos,
            es_interno
        });
        res.status(200).json(nuevaTipoTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTipoTransaccionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const TipoTransaccion = await TipoTransaccionService.getById(id);
        res.status(200).json(TipoTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerTiposTransaccion = async (req, res) => {
    try {
        const tiposTransaccion = await TipoTransaccionService.getAll();
        res.status(200).json(tiposTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarTipoTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, afecta_ingresos, afecta_gastos, es_interno } = req.body;
        const TipoTransaccionActualizada = await TipoTransaccionService.update(id, {
            nombre,
            descripcion,
            afecta_ingresos,
            afecta_gastos,
            es_interno
        });
        res.status(200).json(TipoTransaccionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarTipoTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        await TipoTransaccionService.delete(id);
        res.status(200).json({ message: "Tipo Transaccion eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}