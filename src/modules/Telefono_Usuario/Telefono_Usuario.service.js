import {TelefonoUsuario } from "./Telefono_Usuario.js";

class TelefonoUsuarioService{
    async getAll() {
        try {
            const telefonosUsuario = await TelefonoUsuario.findAll();
            return telefonosUsuario;
        } catch (error) {
            throw new Error("Error al obtener los telefonos de usuario: " + error.message);
        }
    }

    async getById(id) {
        try {
            const telefonoUsuario = await TelefonoUsuario.findByPk(id);
            if (!telefonoUsuario) {
                throw new Error("Telefono de Usuario no encontrada");
            }
            return telefonoUsuario;
        } catch (error) {
            throw new Error("Error al obtener el telefono de usuario: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaZonaTrabajo = await TelefonoUsuario.create(data);
            return nuevaZonaTrabajo;
        } catch (error) {
            throw new Error("Error al crear el telefono de usuario: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const telefonoUsuario = await TelefonoUsuario.findByPk(id);
            if (!telefonoUsuario) {
                throw new Error("Telefono de Usuario no encontrada");
            }
            await telefonoUsuario.update(data);
            return telefonoUsuario;
        } catch (error) {
            throw new Error("Error al actualizar el telefono de usuario: " + error.message);
        }
    }

    async delete(id) {
        try {
            const telefonoUsuario = await TelefonoUsuario.findByPk(id);
            if (!telefonoUsuario) {
                throw new Error("Telefono de Usuario no encontrada");
            }
            await telefonoUsuario.destroy();
            return { message: "Telefono de Usuario eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el telefono de usuario: " + error.message);
        }
    }
}

export const telefonoUsuarioService = new TelefonoUsuarioService();