import { Unidad_Medida } from "./Unidad_Medida.js";

class UnidadMedidaService {
    async getAll() {
        try {
            const unidadesMedida = await Unidad_Medida.findAll();
            return unidadesMedida;
        } catch (error) {
            throw new Error("Error al obtener las unidades de medida: " + error.message);
        }
    }

    async getById(id) {
        try {
            const unidadMedida = await Unidad_Medida.findByPk(id);
            if (!unidadMedida) {
                throw new Error("Unidad de medida no encontrada");
            }
            return unidadMedida;
        } catch (error) {
            throw new Error("Error al obtener la unidad de medida: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaUnidadMedida = await Unidad_Medida.create(data);
            return nuevaUnidadMedida;
        } catch (error) {
            throw new Error("Error al crear la unidad de medida: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const unidadMedida = await Unidad_Medida.findByPk(id);
            if (!unidadMedida) {
                throw new Error("Unidad de medida no encontrada");
            }
            await unidadMedida.update(data);
            return unidadMedida;
        } catch (error) {
            throw new Error("Error al actualizar la unidad de medida: " + error.message);
        }
    }

    async delete(id) {
        try {
            const unidadMedida = await Unidad_Medida.findByPk(id);
            if (!unidadMedida) {
                throw new Error("Unidad de medida no encontrada");
            }
            await unidadMedida.destroy();
            return { message: "Unidad de medida eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la unidad de medida: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const unidadMedida = await Unidad_Medida.findOne({ where: { nombre } });
            if (!unidadMedida) {
                throw new Error("Unidad de medida no encontrada");
            }
            return unidadMedida;
        } catch (error) {
            throw new Error("Error al obtener la unidad de medida por nombre: " + error.message);
        }
    }
}

export const unidadMedidaService = new UnidadMedidaService();