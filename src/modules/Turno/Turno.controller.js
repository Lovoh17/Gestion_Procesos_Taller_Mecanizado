import { turnoService } from "./Turno.service.js";

export const crearTurno = async (req, res) => {
    try {
        const { nombre, descripcion, hora_inicio, hora_fin } = req.body;
        const nuevoTurno = await turnoService.create({
            nombre,
            descripcion,
            hora_inicio,
            hora_fin
        });
        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTurnoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const turno = await turnoService.getById(id);
        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTurnoPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const turno = await turnoService.getByName(nombre);
        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await turnoService.getAll();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, hora_inicio, hora_fin } = req.body;
        const turnoActualizado = await turnoService.update(id, {
            nombre,
            descripcion,
            hora_inicio,
            hora_fin
        });
        res.status(200).json(turnoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        await turnoService.delete(id);
        res.status(200).json({ message: "Turno eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}