import { competenciaService } from "./Competencia.service.js";

export const crearCompetencia = async (req, res) => {
    try {
        const data = req.body;
        const nuevaCompetencia = await competenciaService.create(data);
        res.status(201).json(nuevaCompetencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerCompetencias = async (req, res) => {
    try {
        const competencias = await competenciaService.getAll();
        res.status(200).json(competencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerCompetenciaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const competencia = await competenciaService.getById(id);
        res.status(200).json(competencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarCompetencia = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const competenciaActualizada = await competenciaService.update(id, data);
        res.status(200).json(competenciaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarCompetencia = async (req, res) => {
    try {
        const { id } = req.params;
        await competenciaService.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

