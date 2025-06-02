import { tipoTelefonoService } from "./Tipo_Telefono.service.js";

export const crearTipoTelefono = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoTipoTelefono = await tipoTelefonoService.create({
            nombre,
            descripcion
        });
        res.status(201).json(nuevoTipoTelefono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoTelefonoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoTelefono = await tipoTelefonoService.getById(id);
        res.status(200).json(tipoTelefono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoTelefonoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const tipoTelefono = await tipoTelefonoService.getByName(nombre);
        res.status(200).json(tipoTelefono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTipoTelefono = async (req, res) => {
    try {
        const tipoTelefono = await tipoTelefonoService.getAll();
        res.status(200).json(tipoTelefono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarTipoTelefono = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const tipoTelefonoActualizado = await tipoTelefonoService.update(id, {
            nombre,
            descripcion
        });
        res.status(200).json(tipoTelefonoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarTipoTelefono = async (req, res) => {
    try {
        const { id } = req.params;
        await tipoTelefonoService.delete(id);
        res.status(200).json({ message: "Tipo de teléfono eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
