import { usuarioCompetenciaService } from "./Usuario_Competencia.service.js";

export const crearUsuarioCompetencia = async (req, res) => {
    try {
        const data = req.body;
        const nuevaCompetencia = await usuarioCompetenciaService.create(data);
        res.status(201).json(nuevaCompetencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioCompetencia = async (req, res) => {
    try {
        const competencias = await usuarioCompetenciaService.getAll();
        res.status(200).json(competencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioCompetenciaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const competencia = await usuarioCompetenciaService.getById(id);
        res.status(200).json(competencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarUsuarioCompetencia = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const competenciaActualizada = await usuarioCompetenciaService.update(id, data);
        res.status(200).json(competenciaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarUsuarioCompetencia = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioCompetenciaService.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}