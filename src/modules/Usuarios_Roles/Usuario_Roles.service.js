import { Usuarios_Roles } from "./Usuarios_Roles.js";

class UsuarioRolesService{
    async getAll() {
            try {
                const usuariosRoles = await Usuarios_Roles.findAll();
                return usuariosRoles;
            } catch (error) {
                throw new Error("Error al obtener los roles de usuario: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const UsuarioRol = await Usuarios_Roles.findByPk(id);
                if (!UsuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                return UsuarioRol;
            } catch (error) {
                throw new Error("Error al obtener el rol de usuario: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevaUsuarioRol = await Usuarios_Roles.create(data);
                return nuevaUsuarioRol;
            } catch (error) {
                throw new Error("Error al crear el rol de usuario: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const UsuarioRol = await Usuarios_Roles.findByPk(id);
                if (!UsuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                await UsuarioRol.update(data);
                return UsuarioRol;
            } catch (error) {
                throw new Error("Error al actualizar el rol de usuario: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const UsuarioRol = await Usuarios_Roles.findByPk(id);
                if (!UsuarioRol) {
                    throw new Error("Rol de Usuario no encontrada");
                }
                await UsuarioRol.destroy();
                return { message: "Rol de Usuario eliminada" };
            } catch (error) {
                throw new Error("Error al eliminar el rol de usuario: " + error.message);
            }
        }
    
}

export const UsuarioRolService = new UsuarioRolesService();