import {asignacionInteligenteService} from './AsignacionInteligente.service.js';

export const getAllAsignaciones = async (req, res) => {
    try {
        const asignaciones = await asignacionInteligenteService.getAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAsignacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const asignacion = await asignacionInteligenteService.getById(id);
        res.status(200).json(asignacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createAsignacion = async (req, res) => {
    try {
        const data = req.body;
        const nuevaAsignacion = await asignacionInteligenteService.create(data);
        res.status(201).json(nuevaAsignacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAsignacion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const asignacionActualizada = await asignacionInteligenteService.update(id, data);
        res.status(200).json(asignacionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteAsignacion = async (req, res) => {
    try {
        const { id } = req.params;
        await asignacionInteligenteService.delete(id);
        res.status(200).json({ message: "Asignación eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAsignacionesByPuestoId = async (req, res) => {
    try {
        const { puestoId } = req.params;
        const asignaciones = await asignacionInteligenteService.getByPuestoId(puestoId);
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const sugerirUsuarios = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const { competenciaId } = req.query;

        if (!competenciaId) {
            return res.status(400).json({ error: "El parámetro competenciaId es obligatorio" });
        }

        const sugerencias = await asignacionInteligenteService.sugerirUsuarios(pedidoId, competenciaId);
        res.status(200).json(sugerencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};