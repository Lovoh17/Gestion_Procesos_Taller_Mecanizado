import { Estado_Usuario } from "./Estado_Usuario.js";

class EstadoUsuarioService {
    async getAll() {
        try {
            const estadosUsuario = await Estado_Usuario.findAll();
            return estadosUsuario;
        } catch (error) {
            throw new Error("Error al obtener los estados de usuario: " + error.message);
        }
    }

    async getById(id) {
        try {
            const estadoUsuario = await Estado_Usuario.findByPk(id);
            if (!estadoUsuario) {
                throw new Error("Estado de usuario no encontrado");
            }
            return estadoUsuario;
        } catch (error) {
            throw new Error("Error al obtener el estado de usuario: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoEstadoUsuario = await Estado_Usuario.create(data);
            return nuevoEstadoUsuario;
        } catch (error) {
            throw new Error("Error al crear el estado de usuario: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const estadoUsuario = await Estado_Usuario.findByPk(id);
            if (!estadoUsuario) {
                throw new Error("Estado de usuario no encontrado");
            }
            await estadoUsuario.update(data);
            return estadoUsuario;
        } catch (error) {
            throw new Error("Error al actualizar el estado de usuario: " + error.message);
        }
    }

    async delete(id) {
        try {
            const estadoUsuario = await Estado_Usuario.findByPk(id);
            if (!estadoUsuario) {
                throw new Error("Estado de usuario no encontrado");
            }
            await estadoUsuario.destroy();
            return { message: "Estado de usuario eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el estado de usuario: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const estadoUsuario = await Estado_Usuario.findOne({ where: { nombre } });
            if (!estadoUsuario) {
                throw new Error("Estado de usuario no encontrado");
            }
            return estadoUsuario;
        } catch (error) {
            throw new Error("Error al obtener el estado de usuario por nombre: " + error.message);
        }
    }
}

export const estadoUsuarioService = new EstadoUsuarioService();