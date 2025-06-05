import { mantenimientoService } from "./Mantenimiento.service.js";

export const crearMantenimiento = async (req, res) => {
    try {
        const nuevoMantenimiento = await mantenimientoService.create(req.body);
        res.status(201).json(nuevoMantenimiento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const obtenerMantenimientos = async (req, res) => {
    try {
        const mantenimientos = await mantenimientoService.getAll();
        res.status(200).json(mantenimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const obtenerMantenimientoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const mantenimiento = await mantenimientoService.getById(id);
        res.status(200).json(mantenimiento);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const obtenerMantenimientoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const mantenimientos = await mantenimientoService.getByName(nombre);
        res.status(200).json(mantenimientos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const actualizarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const mantenimientoActualizado = await mantenimientoService.update(id, req.body);
        res.status(200).json(mantenimientoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const eliminarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        await mantenimientoService.delete(id);
        res.status(200).json({ message: "Mantenimiento eliminado" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};