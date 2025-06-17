import { Usuario_Rol } from "./Usuario_Rol.js";

class UsuarioRolService{
    async getAll() {
            try {
                const usuariosRoles = await Usuario_Rol.findAll();
                return usuariosRoles;
            } catch (error) {
                throw new Error("Error al obtener los roles de usuario: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const usuarioRol = await Usuario_Rol.findByPk(id);
                if (!usuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                return usuarioRol;
            } catch (error) {
                throw new Error("Error al obtener el rol de usuario: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevaUsuarioRol = await Usuario_Rol.create(data);
                return nuevaUsuarioRol;
            } catch (error) {
                throw new Error("Error al crear el rol de usuario: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const usuarioRol = await Usuario_Rol.findByPk(id);
                if (!usuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                await usuarioRol.update(data);
                return usuarioRol;
            } catch (error) {
                throw new Error("Error al actualizar el rol de usuario: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const usuarioRol = await Usuario_Rol.findByPk(id);
                if (!usuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                await usuarioRol.destroy();
                return { message: "Rol de Usuario eliminada" };
            } catch (error) {
                throw new Error("Error al eliminar el rol de usuario: " + error.message);
            }
        }
    
}

export const usuarioRolService = new UsuarioRolService();