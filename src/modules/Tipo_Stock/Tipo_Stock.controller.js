import { tipoStockService } from "./Tipo_Stock.service.js";

export const crearTipoStock = async (req, res) => {
    try {
        const { nombre, descripcion, es_exclusivo } = req.body;
        const nuevoTipoStock = await tipoStockService.create({
            nombre,
            descripcion,
            es_exclusivo
        });
        res.status(201).json(nuevoTipoStock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoStockPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoStock = await tipoStockService.getById(id);
        res.status(200).json(tipoStock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoStockPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const tipoStock = await tipoStockService.getByName(nombre);
        res.status(200).json(tipoStock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoStock = async (req, res) => {
    try {
        const tipoStock = await tipoStockService.getAll();
        res.status(200).json(tipoStock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarTipoStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, es_exclusivo } = req.body;
        const tipoStockActualizado = await tipoStockService.update(id, {
            nombre,
            descripcion,
            es_exclusivo
        });
        res.status(200).json(tipoStockActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarTipoStock = async (req, res) => {
    try {
        const { id } = req.params;
        await tipoStockService.delete(id);
        res.status(200).json({ message: "Tipo de stock eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}