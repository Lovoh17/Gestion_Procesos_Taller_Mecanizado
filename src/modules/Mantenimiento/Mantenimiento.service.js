import { Mantenimiento } from "./Mantenimiento.js";
import { Op } from "sequelize";

class MantenimientoService {
    async getAll() {
        try {
            const mantenimientos = await Mantenimiento.findAll();
            return mantenimientos;
        } catch (error) {
            throw new Error("Error al obtener los mantenimientos: " + error.message);
        }
    }

    async getById(id) {
        try {
            const mantenimiento = await Mantenimiento.findByPk(id);
            if (!mantenimiento) {
                throw new Error("Mantenimiento no encontrado");
            }
            return mantenimiento;
        } catch (error) {
            throw new Error("Error al obtener el mantenimiento: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const mantenimientos = await Mantenimiento.findAll({
                where: {
                    nombre: {
                        [Op.iLike]: `%${nombre}%`
                    }
                }
            });
            if (!mantenimientos || mantenimientos.length === 0) {
                throw new Error("No se encontraron mantenimientos con ese nombre");
            }
            return mantenimientos;
        } catch (error) {
            throw new Error("Error al buscar por nombre: " + error.message);
        }
    }

    async getByTecnico(tecnico_asignado_id) {
        try {
            const mantenimientos = await Mantenimiento.findAll({
                where: { tecnico_asignado_id }
            });
            if (!mantenimientos || mantenimientos.length === 0) {
                throw new Error("No se encontraron mantenimientos para este técnico");
            }
            return mantenimientos;
        } catch (error) {
            throw new Error("Error al buscar por técnico: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoMantenimiento = await Mantenimiento.create(data);
            return nuevoMantenimiento;
        } catch (error) {
            throw new Error("Error al crear el mantenimiento: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const mantenimiento = await Mantenimiento.findByPk(id);
            if (!mantenimiento) {
                throw new Error("Mantenimiento no encontrado");
            }
            await mantenimiento.update(data);
            return mantenimiento;
        } catch (error) {
            throw new Error("Error al actualizar el mantenimiento: " + error.message);
        }
    }

    async delete(id) {
        try {
            const mantenimiento = await Mantenimiento.findByPk(id);
            if (!mantenimiento) {
                throw new Error("Mantenimiento no encontrado");
            }
            await mantenimiento.destroy();
            return { message: "Mantenimiento eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el mantenimiento: " + error.message);
        }
    }
}

export const mantenimientoService = new MantenimientoService();