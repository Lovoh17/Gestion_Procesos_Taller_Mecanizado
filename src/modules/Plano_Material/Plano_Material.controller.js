import { planoMaterialService } from "./Plano_Material.service.js";

export const crearPlanoMaterial = async (req, res) => {
  try {
    const nuevoRegistro = await planoMaterialService.create(req.body);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPlanosMaterial = async (req, res) => {
  try {
    const registros = await planoMaterialService.getAll();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPlanoMaterialPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await planoMaterialService.getById(id);
    res.status(200).json(registro);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarPlanoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await planoMaterialService.update(id, req.body);
    res.status(200).json(registroActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarPlanoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await planoMaterialService.delete(id);
    res.status(200).json({ message: "Registro eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};