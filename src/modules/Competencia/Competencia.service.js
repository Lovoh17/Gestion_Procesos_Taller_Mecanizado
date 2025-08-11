import {Competencia} from './Competencia.js';

class CompetenciaService {

    async getAll() {
        try {
            const competencias = await Competencia.findAll();
            return competencias;
        } catch (error) {
            throw new Error("Error al obtener las competencias: " + error.message);
        }
    }

    async getById(id) {
        try {
            const competencia = await Competencia.findByPk(id);
            if (!competencia) {
                throw new Error("Competencia no encontrada");
            }
            return competencia;
        } catch (error) {
            throw new Error("Error al obtener la competencia: " + error.message);
        }
    }

    async create(data) {
        try {
            return await Competencia.create(data);
        } catch (error) {
            throw new Error("Error al crear la competencia: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const competencia = await Competencia.findByPk(id);
            if (!competencia) {
                throw new Error("Competencia no encontrada");
            }
            await competencia.update(data);
            return competencia;
        } catch (error) {
            throw new Error("Error al actualizar la competencia: " + error.message);
        }
    }

    async delete(id) {
        try {
            const competencia = await Competencia.findByPk(id);
            if (!competencia) {
                throw new Error("Competencia no encontrada");
            }
            await competencia.destroy();
        } catch (error) {
            throw new Error("Error al eliminar la competencia: " + error.message);
        }
    }

}

export const competenciaService = new CompetenciaService();