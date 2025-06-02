import {Turno} from './Turno.js';

class TurnoService {
    async getAll() {
        try {
            const turnos = await Turno.findAll();
            return turnos;
        } catch (error) {
            throw new Error("Error al obtener los turnos: " + error.message);
        }
    }

    async getById(id) {
        try {
            const turno = await Turno.findByPk(id);
            if (!turno) {
                throw new Error("Turno no encontrado");
            }
            return turno;
        } catch (error) {
            throw new Error("Error al obtener el turno: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTurno = await Turno.create(data);
            return nuevoTurno;
        } catch (error) {
            throw new Error("Error al crear el turno: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const turno = await Turno.findByPk(id);
            if (!turno) {
                throw new Error("Turno no encontrado");
            }
            await turno.update(data);
            return turno;
        } catch (error) {
            throw new Error("Error al actualizar el turno: " + error.message);
        }
    }

    async delete(id) {
        try {
            const turno = await Turno.findByPk(id);
            if (!turno) {
                throw new Error("Turno no encontrado");
            }
            await turno.destroy();
            return { message: "Turno eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el turno: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const turno = await Turno.findOne({ where: { nombre } });
            if (!turno) {
                throw new Error("Turno no encontrado");
            }
            return turno;
        } catch (error) {
            throw new Error("Error al obtener el turno por nombre: " + error.message);
        }
    }
}

export const turnoService = new TurnoService();