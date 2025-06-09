import { MetodoPagoService } from "./Metodo_Pago.service.js";

export const crearMetodoPago = async (req, res) => {
    try {
        const { nombre, descripcion, requiere_referencia } = req.body;
        const nuevaMetodoPago = await MetodoPagoService.create({
            nombre,
            descripcion,
            requiere_referencia
        });
        res.status(200).json(nuevaMetodoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerMetodoPagoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const MetodoPago = await MetodoPagoService.getById(id);
        res.status(200).json(MetodoPago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerMetodosPago = async (req, res) => {
    try {
        const metodosPagos = await MetodoPagoService.getAll();
        res.status(200).json(metodosPagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarMetodoPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, requiere_referencia } = req.body;
        const MetodoPagoActualizada = await MetodoPagoService.update(id, {
            nombre,
            descripcion,
            requiere_referencia
        });
        res.status(200).json(MetodoPagoActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarMetodoPago = async (req, res) => {
    try {
        const { id } = req.params;
        await MetodoPagoService.delete(id);
        res.status(200).json({ message: "Metodo de Pago eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}