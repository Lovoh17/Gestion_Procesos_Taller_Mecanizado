import { Reserva_Herramienta } from "./Reserva_Herramienta.js";

class ReservaHerramientaService{
    async create(data) {
        try {
            const nuevaReserva = await Reserva_Herramienta.create(data);
            return nuevaReserva;
        } catch (error) {
            throw new Error("Error al crear la reserva de la herramienta: " + error.message);
        }
    }

    async getAll() {
        try {
            const reservas = await Reserva_Herramienta.findAll();
            return reservas;
        } catch (error) {
            throw new Error("Error al obtener todas las reservas de herramientas: " + error.message);
        }
    }

    async getById(id) {
        try {
            const reserva = await Reserva_Herramienta.findByPk(id);
            if (!reserva) {
                throw new Error("Reserva no encontrada");
            }
            return reserva;
        } catch (error) {
            throw new Error("Error al obtener la reserva de la herramienta: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const reserva = await Reserva_Herramienta.findByPk(id);
            if (!reserva) {
                throw new Error("Reserva no encontrada");
            }
            await reserva.update(data);
            return reserva;
        } catch (error) {
            throw new Error("Error al actualizar la reserva de la herramienta: " + error.message);
        }
    }

    async delete(id) {
        try {
            const reserva = await Reserva_Herramienta.findByPk(id);
            if (!reserva) {
                throw new Error("Reserva no encontrada");
            }
            await reserva.destroy();
            return { message: "Reserva eliminada con éxito" };
        } catch (error) {
            throw new Error("Error al eliminar la reserva de la herramienta: " + error.message);
        }
    }
}

export const reservaHerramientaService = new ReservaHerramientaService();
