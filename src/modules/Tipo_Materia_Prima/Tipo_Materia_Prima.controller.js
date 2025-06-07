import { tipoMateriaPrimaService } from "./Tipo_Materia_Prima.service.js";

export const crearTipoMateriaPrima = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoTipoMateriaPrima = await tipoMateriaPrimaService.create({
            nombre,
            descripcion
        });
        res.status(201).json(nuevoTipoMateriaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoMateriaPrimaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoMateriaPrima = await tipoMateriaPrimaService.getById(id);
        res.status(200).json(tipoMateriaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoMateriaPrimaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const tipoMateriaPrima = await tipoMateriaPrimaService.getByName(nombre);
        res.status(200).json(tipoMateriaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoMateriaPrima = async (req, res) => {
    try {
        const tipoMateriaPrima = await tipoMateriaPrimaService.getAll();
        res.status(200).json(tipoMateriaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarTipoMateriaPrima = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const tipoMateriaPrimaActualizado = await tipoMateriaPrimaService.update(id, {
            nombre,
            descripcion
        });
        res.status(200).json(tipoMateriaPrimaActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarTipoMateriaPrima = async (req, res) => {
    try {
        const { id } = req.params;
        await tipoMateriaPrimaService.delete(id);
        res.status(200).json({ message: "Tipo de materia prima eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}