import { tipoHerramientaService } from "./Tipo_Herramienta.service.js";

export const crearTipoHerramienta = async (req, res) => {
    try {
        const { nombre, descripcion, caracteristicas_clave } = req.body;
        const nuevoTipoHerramienta = await tipoHerramientaService.create({
            nombre,
            descripcion,
            caracteristicas_clave
        });
        res.status(201).json(nuevoTipoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoHerramientaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoHerramienta = await tipoHerramientaService.getById(id);
        res.status(200).json(tipoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoHerramientaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const tipoHerramienta = await tipoHerramientaService.getByName(nombre);
        res.status(200).json(tipoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoHerramienta = async (req, res) => {
    try {
        const tipoHerramienta = await tipoHerramientaService.getAll();
        res.status(200).json(tipoHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarTipoHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, caracteristicas_clave } = req.body;
        const tipoHerramientaActualizado = await tipoHerramientaService.update(id, {
            nombre,
            descripcion,
            caracteristicas_clave
        });
        res.status(200).json(tipoHerramientaActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarTipoHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        await tipoHerramientaService.delete(id);
        res.status(200).json({ message: "Tipo de herramienta eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}