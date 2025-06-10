import {Materia_Prima} from "./Materia_Prima.js"

class MateriaPrimaService {
    async getAll() {
        try {
            const materiasPrima = await Materia_Prima.findAll();
            return materiasPrima;
        } catch (error) {
            throw new Error("Error al obtener las materias primas: " + error.message);
        }
    }

    async getById(id) {
        try {
            const materiaPrima = await Materia_Prima.findByPk(id);
            if (!materiaPrima) {
                throw new Error("Materia Prima no encontrada");
            }
            return materiaPrima;
        } catch (error) {
            throw new Error("Error al obtener la materia prima: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaMateriaPrima = await Materia_Prima.create(data);
            return nuevaMateriaPrima;
        } catch (error) {
            throw new Error("Error al crear la materia prima: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const materiaPrima = await Materia_Prima.findByPk(id);
            if (!materiaPrima) {
                throw new Error("Materia Prima no encontrada");
            }
            await materiaPrima.update(data);
            return materiaPrima;
        } catch (error) {
            throw new Error("Error al actualizar la materia prima: " + error.message);
        }
    }

    async delete(id) {
        try {
            const materiaPrima = await Materia_Prima.findByPk(id);
            if (!materiaPrima) {
                throw new Error("Materia Prima no encontrada");
            }
            await materiaPrima.destroy();
            return { message: "Materia Prima eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la materia prima: " + error.message);
        }
    }
}

export const MateriaPrimaService = new MateriaPrimaService();