import { estadoUsuarioService } from "./Estado_Usuario.service.js";

export const crearEstadoUsuario = async (req, res) => {
    try {
        const { nombre, descripcion, permite_acceso, color_indicador, es_editable } = req.body;
        const nuevoEstadoUsuario = await estadoUsuarioService.create({
            nombre,
            descripcion,
            permite_acceso,
            color_indicador,
            es_editable
        });
        res.status(201).json(nuevoEstadoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerEstadoUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estadoUsuario = await estadoUsuarioService.getById(id);
        res.status(200).json(estadoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerEstadoUsuarioPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const estadoUsuario = await estadoUsuarioService.getByName(nombre);
        res.status(200).json(estadoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerEstadoUsuario = async (req, res) => {
    try {
        const estadoUsuario = await estadoUsuarioService.getAll();
        res.status(200).json(estadoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarEstadoUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, permite_acceso, color_indicador, es_editable } = req.body;
        const estadoUsuarioActualizado = await estadoUsuarioService.update(id, {
            nombre,
            descripcion,
            permite_acceso,
            color_indicador,
            es_editable
        });
        res.status(200).json(estadoUsuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarEstadoUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await estadoUsuarioService.delete(id);
        res.status(200).json({ message: "Estado de usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}