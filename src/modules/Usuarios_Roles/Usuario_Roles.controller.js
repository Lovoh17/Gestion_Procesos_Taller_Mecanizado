import { usuarioRolService } from "./Usuario_Roles.service.js";

export const crearUsuarioRol = async (req, res) => {
    try {
        const { usuario_id, role_id } = req.body;
        const nuevaUsuarioRol = await usuarioRolService.create({
            usuario_id,
            role_id
        });
        res.status(201).json(nuevaUsuarioRol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioRolPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const zonaTrabajo = await usuarioRolService.getById(id);
        res.status(200).json(zonaTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioRolPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const zonaTrabajo = await usuarioRolService.getByName(nombre);
        res.status(200).json(zonaTrabajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioRoles = async (req, res) => {
    try {
        const usuarioRoles = await usuarioRolService.getAll();
        res.status(200).json(usuarioRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarUsuarioRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, role_id } = req.body;
        const zonaTrabajoActualizada = await usuarioRolService.update(id, {
            usuario_id,
            role_id
        });
        res.status(200).json(zonaTrabajoActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarUsuarioRol = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioRolService.delete(id);
        res.status(200).json({ message: "Zona de trabajo eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}