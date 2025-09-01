import { UsuarioCompetencia } from "./Usuario_Competencia.js";

class UsuarioCompetenciaService {
    async getAll() {
        try {
            const competencias = await UsuarioCompetencia.findAll({
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Competencia, as: 'competencia' }
                ]
            });
            return competencias;
        } catch (error) {
            throw new Error("Error al obtener las competencias de usuario: " + error.message);
        }
    }

    async getById(id) {
        try {
            const competencia = await UsuarioCompetencia.findByPk(id, {
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Competencia, as: 'competencia' }
                ]
            });
            if (!competencia) {
                throw new Error("Competencia de usuario no encontrada");
            }
            return competencia;
        } catch (error) {
            throw new Error("Error al obtener la competencia de usuario: " + error.message);
        }
    }

    async create(data) {
        try {
            return await UsuarioCompetencia.create(data);
        } catch (error) {
            throw new Error("Error al crear la competencia de usuario: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const competencia = await UsuarioCompetencia.findByPk(id);
            if (!competencia) {
                throw new Error("Competencia de usuario no encontrada");
            }
            await competencia.update(data);
            return competencia;
        } catch (error) {
            throw new Error("Error al actualizar la competencia de usuario: " + error.message);
        }
    }

    async delete(id) {
        try {
            const competencia = await UsuarioCompetencia.findByPk(id);
            if (!competencia) {
                throw new Error("Competencia de usuario no encontrada");
            }
            await competencia.destroy();
            return { message: "Competencia de usuario eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la competencia de usuario: " + error.message);
        }
    }
}

export const usuarioCompetenciaService = new UsuarioCompetenciaService();
