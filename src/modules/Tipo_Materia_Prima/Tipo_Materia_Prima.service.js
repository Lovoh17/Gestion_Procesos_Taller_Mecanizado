import { Tipo_Materia_Prima } from "./Tipo_Materia_Prima.js";

class TipoMateriaPrimaService{
    async getAll() {
        try {
            const tiposMateriaPrima = await Tipo_Materia_Prima.findAll();
            return tiposMateriaPrima;
        } catch (error) {
            throw new Error("Error al obtener los tipos de materia prima: " + error.message);
        }
    }

    async getById(id) {
        try {
            const tipoMateriaPrima = await Tipo_Materia_Prima.findByPk(id);
            if (!tipoMateriaPrima) {
                throw new Error("Tipo de materia prima no encontrado");
            }
            return tipoMateriaPrima;
        } catch (error) {
            throw new Error("Error al obtener el tipo de materia prima: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTipoMateriaPrima = await Tipo_Materia_Prima.create(data);
            return nuevoTipoMateriaPrima;
        } catch (error) {
            throw new Error("Error al crear el tipo de materia prima: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const tipoMateriaPrima = await Tipo_Materia_Prima.findByPk(id);
            if (!tipoMateriaPrima) {
                throw new Error("Tipo de materia prima no encontrado");
            }
            await tipoMateriaPrima.update(data);
            return tipoMateriaPrima;
        } catch (error) {
            throw new Error("Error al actualizar el tipo de materia prima: " + error.message);
        }
    }

    async delete(id) {
        try {
            const tipoMateriaPrima = await Tipo_Materia_Prima.findByPk(id);
            if (!tipoMateriaPrima) {
                throw new Error("Tipo de materia prima no encontrado");
            }
            await tipoMateriaPrima.destroy();
            return { message: "Tipo de materia prima eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el tipo de materia prima: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const tipoMateriaPrima = await Tipo_Materia_Prima.findOne({ where: { nombre } });
            if (!tipoMateriaPrima) {
                throw new Error("Tipo de materia prima no encontrado");
            }
            return tipoMateriaPrima;
        } catch (error) {
            throw new Error("Error al obtener el tipo de materia prima por nombre: " + error.message);
        }
    }
} 

export const tipoMateriaPrimaService = new TipoMateriaPrimaService();