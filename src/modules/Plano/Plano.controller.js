import { planoService } from "./Plano.service.js";

export const crearPlano = async (req, res) => {
  try {
    const nuevoPlano = await planoService.create(req.body);
    res.status(201).json(nuevoPlano);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPlanos = async (req, res) => {
  try {
    const planos = await planoService.getAll();
    res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPlanoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const plano = await planoService.getById(id);
    res.status(200).json(plano);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPlano = async (req, res) => {
  try {
    const { id } = req.params;
    const planoActualizado = await planoService.update(id, req.body);
    res.status(200).json(planoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPlano = async (req, res) => {
  try {
    const { id } = req.params;
    await planoService.delete(id);
    res.status(200).json({ message: "Plano eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};