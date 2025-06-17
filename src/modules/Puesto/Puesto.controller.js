import { puestoService } from "./Puesto.service.js";

export const crearPuesto = async (req, res) => {
    try {
        const { nombre_puesto, descripcion, nivel_jerarquico, es_supervisor} = req.body;
        const nuevoPuesto = await puestoService.create({
            nombre_puesto,
            descripcion,
            nivel_jerarquico,
            es_supervisor
        });
        res.status(201).json(nuevoPuesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerPuestoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const puesto = await puestoService.getById(id);
        res.status(200).json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerPuestoPorNombre = async (req, res) => {
    try {
        const { nombre_puesto } = req.params;
        const puesto = await puestoService.getByName(nombre_puesto);
        res.status(200).json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerPuestos = async (req, res) => {
    try {
        const puestos = await puestoService.getAll();
        res.status(200).json(puestos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarPuesto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_puesto, descripcion, nivel_jerarquico, es_supervisor} = req.body;
        const puestoActualizado = await puestoService.update(id, {
            nombre_puesto,
            descripcion,
            nivel_jerarquico,
            es_supervisor
        });
        res.status(200).json(puestoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarPuesto = async (req, res) => {
    try {
        const { id } = req.params;
        await puestoService.delete(id);
        res.status(200).json({ message: "Puesto eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}