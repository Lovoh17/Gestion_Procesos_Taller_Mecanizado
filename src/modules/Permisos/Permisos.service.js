import { Permisos } from "./Permisos.js";

class PermisosService{
    async getAll() {
        try {
            const permisos = await Permisos.findAll();
            return permisos;
        } catch (error) {
            throw new Error("Error al obtener los permisos: " + error.message);
        }
    }

    async getById(id) {
        try {
            const permiso = await Permisos.findByPk(id);
            if (!permiso) {
                throw new Error("Permiso no encontrado");
            }
            return permiso;
        } catch (error) {
            throw new Error("Error al obtener el permiso: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaPermiso = await Permisos.create(data);
            return nuevaPermiso;
        } catch (error) {
            throw new Error("Error al crear el permiso: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const permiso = await Permisos.findByPk(id);
            if (!permiso) {
                throw new Error("Permiso no encontrado");
            }
            await permiso.update(data);
            return permiso;
        } catch (error) {
            throw new Error("Error al actualizar el permiso: " + error.message);
        }
    }

    async delete(id) {
        try {
            const permiso = await Permisos.findByPk(id);
            if (!permiso) {
                throw new Error("Permiso no encontrado");
            }
            await permiso.destroy();
            return { message: "Permiso eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el permiso: " + error.message);
        }
    }
    
}

export const permisoService = new PermisosService()