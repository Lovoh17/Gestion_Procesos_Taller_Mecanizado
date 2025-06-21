import { Usuario } from "./Usuario.js";

class UsuarioService{
    async getAll() {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw new Error("Error al obtener los usuarios: " + error.message);
        }
    }

    async getById(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario no encontrada");
            }
            return usuario;
        } catch (error) {
            throw new Error("Error al obtener usuario: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaZonaTrabajo = await Usuario.create(data);
            return nuevaZonaTrabajo;
        } catch (error) {
            throw new Error("Error al crear usuario: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario no encontrada");
            }
            await usuario.update(data);
            return usuario;
        } catch (error) {
            throw new Error("Error al actualizar usuario: " + error.message);
        }
    }

    async delete(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario no encontrada");
            }
            await usuario.destroy();
            return { message: "Usuario eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar usuario: " + error.message);
        }
    }
    async getByPuestoId(puesto_id){
        try {
            const usuarios = await Usuario.findAll({where: puesto_id });
            if (usuarios.length === 0) {
                throw new Error("No se encontraron usuarios para el puesto especificado");
            }
            return usuarios;
        } catch (error) {
            throw new Error("Error al obtener los usuarios mediante id puesto: "+ error.message);
        }
    }
}
export const usuarioService = new UsuarioService();