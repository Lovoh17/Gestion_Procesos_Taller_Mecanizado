import { reservaHerramientaService } from "./Reserva_Herramienta.service.js";

export const createReservaHerramienta = async (req, res) => {
    try {
        const nuevaReserva = await reservaHerramientaService.create(req.body);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllReservasHerramienta = async (req, res) => {
    try {
        const reservas = await reservaHerramientaService.getAll();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReservaHerramientaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservaHerramientaService.getById(id);
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateReservaHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReserva = await reservaHerramientaService.update(id, req.body);
        res.status(200).json(updatedReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReservaHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        await reservaHerramientaService.delete(id);
        res.status(200).json({ message: "Reserva eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
