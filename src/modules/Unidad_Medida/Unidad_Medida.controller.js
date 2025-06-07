import { unidadMedidaService } from "./Unidad_Medida.service.js";

export const crearUnidadMedida = async (req, res) => {
    try {
        const { nombre, abreviatura, tipo } = req.body;
        const nuevaUnidadMedida = await unidadMedidaService.create({
            nombre,
            abreviatura,
            tipo
        });
        res.status(201).json(nuevaUnidadMedida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerUnidadMedidaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const unidadMedida = await unidadMedidaService.getById(id);
        res.status(200).json(unidadMedida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerUnidadMedidaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const unidadMedida = await unidadMedidaService.getByName(nombre);
        res.status(200).json(unidadMedida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerUnidadMedida = async (req, res) => {
    try {
        const unidadMedida = await unidadMedidaService.getAll();
        res.status(200).json(unidadMedida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarUnidadMedida = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, abreviatura, tipo } = req.body;
        const unidadMedidaActualizada = await unidadMedidaService.update(id, {
            nombre,
            abreviatura,
            tipo
        });
        res.status(200).json(unidadMedidaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarUnidadMedida = async (req, res) => {
    try {
        const { id } = req.params;
        await unidadMedidaService.delete(id);
        res.status(200).json({ message: "Unidad de medida eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}