import { Herramienta } from "./Herramienta.js";

class HerramientaService{
    async getAll() {
        try {
            const herramientas = await Herramienta.findAll();
            return herramientas;
        } catch (error) {
            throw new Error("Error al obtener las herramientas: " + error.message);
        }
    }

    async getById(id) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            return herramienta;
        } catch (error) {
            throw new Error("Error al obtener la herramienta: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaHerramienta = await Herramienta.create(data);
            return nuevaHerramienta;
        } catch (error) {
            throw new Error("Error al crear la herramienta: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            await herramienta.update(data);
            return herramienta;
        } catch (error) {
            throw new Error("Error al actualizar la herramienta: " + error.message);
        }
    }

    async delete(id) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            await herramienta.destroy();
            return { message: "Herramienta eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la herramienta: " + error.message);
        }
    }
}

export const HerramientaService = new HerramientaService();