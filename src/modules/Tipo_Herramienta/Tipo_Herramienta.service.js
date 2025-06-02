import { Tipo_Herramienta } from "./Tipo_Herramienta.js";

class TipoHerramientaService {
    async getAll() {
        try {
            const tiposHerramienta = await Tipo_Herramienta.findAll();
            return tiposHerramienta;
        } catch (error) {
            throw new Error("Error al obtener los tipos de herramienta: " + error.message);
        }
    }

    async getById(id) {
        try {
            const tipoHerramienta = await Tipo_Herramienta.findByPk(id);
            if (!tipoHerramienta) {
                throw new Error("Tipo de herramienta no encontrado");
            }
            return tipoHerramienta;
        } catch (error) {
            throw new Error("Error al obtener el tipo de herramienta: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTipoHerramienta = await Tipo_Herramienta.create(data);
            return nuevoTipoHerramienta;
        } catch (error) {
            throw new Error("Error al crear el tipo de herramienta: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const tipoHerramienta = await Tipo_Herramienta.findByPk(id);
            if (!tipoHerramienta) {
                throw new Error("Tipo de herramienta no encontrado");
            }
            await tipoHerramienta.update(data);
            return tipoHerramienta;
        } catch (error) {
            throw new Error("Error al actualizar el tipo de herramienta: " + error.message);
        }
    }

    async delete(id) {
        try {
            const tipoHerramienta = await Tipo_Herramienta.findByPk(id);
            if (!tipoHerramienta) {
                throw new Error("Tipo de herramienta no encontrado");
            }
            await tipoHerramienta.destroy();
            return { message: "Tipo de herramienta eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el tipo de herramienta: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const tipoHerramienta = await Tipo_Herramienta.findOne({ where: { nombre } });
            if (!tipoHerramienta) {
                throw new Error("Tipo de herramienta no encontrado");
            }
            return tipoHerramienta;
        } catch (error) {
            throw new Error("Error al obtener el tipo de herramienta por nombre: " + error.message);
        }
    }
}
export const tipoHerramientaService = new TipoHerramientaService();