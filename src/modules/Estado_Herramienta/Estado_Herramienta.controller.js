import { estadoHerramientaService } from "./Estado_Herramienta.sevice.js";

export const crearEstadoHerramienta = async (req, res) => {
    try {
        const { nombre, descripcion, permiso_uso, color_indicador, requiere_autorizacion } = req.body;
        const nuevoEstadoHerramienta = await estadoHerramientaService.create({
            nombre,
            descripcion,
            permiso_uso,
            color_indicador,
            requiere_autorizacion
        });
        res.status(201).json(nuevoEstadoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoHerramientaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estadoHerramienta = await estadoHerramientaService.getById(id);
        res.status(200).json(estadoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerEstadoHerramientaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const estadoHerramienta = await estadoHerramientaService.getByName(nombre);
        res.status(200).json(estadoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerEstadoHerramienta = async (req, res) => {
    try {
        const estadoHerramienta = await estadoHerramientaService.getAll();
        res.status(200).json(estadoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarEstadoHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, permiso_uso, color_indicador, requiere_autorizacion } = req.body;
        const estadoHerramientaActualizado = await estadoHerramientaService.update(id, {
            nombre,
            descripcion,
            permiso_uso,
            color_indicador,
            requiere_autorizacion
        });
        res.status(200).json(estadoHerramientaActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarEstadoHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        await estadoHerramientaService.delete(id);
        res.status(200).json({ message: "Estado de herramienta eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}