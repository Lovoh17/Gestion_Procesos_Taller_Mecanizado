import { Estado_Herramienta } from "./Estado_Herramienta.js";

class EstadoHerramientaService {
    async getAll() {
        try {
            const estadoHerramienta = await Estado_Herramienta.findAll();
            return estadoHerramienta;
        } catch (error) {
            throw new Error("Error al obtener los estados de herramienta: " + error.message);
        }
    }

    async getById(id) {
        try {
            const estadoHerramienta = await Estado_Herramienta.findByPk(id);
            if (!estadoHerramienta) {
                throw new Error("Estado de herramienta no encontrado");
            }
            return estadoHerramienta;
        } catch (error) {
            throw new Error("Error al obtener el estado de herramienta: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoEstadoHerramienta = await Estado_Herramienta.create(data);
            return nuevoEstadoHerramienta;
        } catch (error) {
            throw new Error("Error al crear el estado de herramienta: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const estadoHerramienta = await Estado_Herramienta.findByPk(id);
            if (!estadoHerramienta) {
                throw new Error("Estado de herramienta no encontrado");
            }
            await estadoHerramienta.update(data);
            return estadoHerramienta;
        } catch (error) {
            throw new Error("Error al actualizar el estado de herramienta: " + error.message);
        }
    }

    async delete(id) {
        try {
            const estadoHerramienta = await Estado_Herramienta.findByPk(id);
            if (!estadoHerramienta) {
                throw new Error("Estado de herramienta no encontrado");
            }
            await estadoHerramienta.destroy();
            return { message: "Estado de herramienta eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el estado de herramienta: " + error.message);
        }
    }
    async getByName(nombre) {
        try {
            const estadoHerramienta = await Estado_Herramienta.findOne({ where: { nombre } });
            if (!estadoHerramienta) {
                throw new Error("Estado de herramienta no encontrado");
            }
            return estadoHerramienta;
        } catch (error) {
            throw new Error("Error al obtener el estado de herramienta: " + error.message);
        }
    }
}

export const estadoHerramientaService = new EstadoHerramientaService();