import { planoHerramientaService } from "./Plano_Herramienta.service.js";

export const crearPlanoHerramienta = async (req, res) => {
  try {
    const nuevoRegistro = await planoHerramientaService.create(req.body);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPlanosHerramienta = async (req, res) => {
  try {
    const registros = await planoHerramientaService.getAll();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPlanoHerramientaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await planoHerramientaService.getById(id);
    res.status(200).json(registro);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPlanoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await planoHerramientaService.update(id, req.body);
    res.status(200).json(registroActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPlanoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    await planoHerramientaService.delete(id);
    res.status(200).json({ message: "Registro eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};