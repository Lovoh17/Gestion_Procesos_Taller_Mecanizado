import { permisoService } from "./Permiso.service.js";

export const crearPermiso = async (req, res) => {
    try {
        const { role_id, descripcion } = req.body;
        const nuevoPermiso = await permisoService.create({
            role_id,
            descripcion
        });
        res.status(200).json(nuevoPermiso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerPermisoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const permiso = await permisoService.getById(id);
        res.status(200).json(permiso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerPermisos = async (req, res) => {
    try {
        const permisos = await permisoService.getAll();
        res.status(200).json(permisos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarPermiso = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_id, descripcion } = req.body;
        const permisoActualizado = await permisoService.update(id, {
            role_id,
            descripcion
        });
        res.status(200).json(permisoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarPermiso = async (req, res) => {
    try {
        const { id } = req.params;
        await permisoService.delete(id);
        res.status(200).json({ message: "Permiso Eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}