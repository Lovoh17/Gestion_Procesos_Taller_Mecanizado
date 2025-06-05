import { historialUsoHerramientasService } from "./Historial_Uso_Herramienta.service.js";

export const crearHistorialUsoHerramienta = async (req, res) => {
  try {
    const nuevoRegistro = await historialUsoHerramientasService.create(req.body);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerHistorialUsoHerramientas = async (req, res) => {
  try {
    const registros = await historialUsoHerramientasService.getAll();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerHistorialUsoHerramientaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await historialUsoHerramientasService.getById(id);
    res.status(200).json(registro);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerHistorialUsoHerramientaPorNotas = async (req, res) => {
  try {
    const { notas } = req.params;
    const registros = await historialUsoHerramientasService.getByNotas(notas);
    res.status(200).json(registros);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarHistorialUsoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await historialUsoHerramientasService.update(id, req.body);
    res.status(200).json(registroActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarHistorialUsoHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    await historialUsoHerramientasService.delete(id);
    res.status(200).json({ message: "Registro eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};