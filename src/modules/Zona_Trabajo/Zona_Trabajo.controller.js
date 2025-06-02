import { zonaTrabajoService } from "./Zona_Trabajo.service.js";

export const crearZonaTrabajo = async (req, res) => {
    try {
        const { nombre, descripcion, ubicacion, responsable_id } = req.body;
        const nuevaZonaTrabajo = await zonaTrabajoService.create({
            nombre,
            descripcion,
            ubicacion,
            responsable_id
        });
        res.status(201).json(nuevaZonaTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerZonaTrabajoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const zonaTrabajo = await zonaTrabajoService.getById(id);
        res.status(200).json(zonaTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerZonaTrabajoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const zonaTrabajo = await zonaTrabajoService.getByName(nombre);
        res.status(200).json(zonaTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerZonasTrabajo = async (req, res) => {
    try {
        const zonasTrabajo = await zonaTrabajoService.getAll();
        res.status(200).json(zonasTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarZonaTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, ubicacion, responsable_id } = req.body;
        const zonaTrabajoActualizada = await zonaTrabajoService.update(id, {
            nombre,
            descripcion,
            ubicacion,
            responsable_id
        });
        res.status(200).json(zonaTrabajoActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarZonaTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        await zonaTrabajoService.delete(id);
        res.status(200).json({ message: "Zona de trabajo eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerZonasTrabajoPorResponsable = async (req, res) => {
    try {
        const { responsable_id } = req.params;
        const zonasTrabajo = await zonaTrabajoService.getByResponsableId(responsable_id);
        res.status(200).json(zonasTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
