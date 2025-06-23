<<<<<<< HEAD:src/modules/Tipo_Transaccion/Tipo_Transaccion.controller.js
import { tipoTransaccionService } from "./Tipo_Transaccion.service.js";
=======
import { tipoTransaccionService } from "./Tipos_Transaccion.service.js";
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Transaccion/Tipos_Transaccion.controller.js

export const crearTipoTransaccion = async (req, res) => {
    try {
        const { nombre, descripcion, afecta_ingresos, afecta_gastos, es_interno } = req.body;
        const nuevaTipoTransaccion = await tipoTransaccionService.create({
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
        const TipoTransaccion = await tipoTransaccionService.getById(id);
        res.status(200).json(TipoTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerTiposTransaccion = async (req, res) => {
    try {
        const tiposTransaccion = await tipoTransaccionService.getAll();
        res.status(200).json(tiposTransaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarTipoTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, afecta_ingresos, afecta_gastos, es_interno } = req.body;
        const TipoTransaccionActualizada = await tipoTransaccionService.update(id, {
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
        await tipoTransaccionService.delete(id);
        res.status(200).json({ message: "Tipo Transaccion eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}