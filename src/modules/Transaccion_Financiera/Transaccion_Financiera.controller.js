import { transaccionFinancieraService } from "./Transaccion_Financiera.service.js";

export const crearTransaccionFinanciera = async (req, res) => {
  try {
    const nuevaTransaccion = await transaccionFinancieraService.create(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerTransaccionesFinancieras = async (req, res) => {
  try {
    const transacciones = await transaccionFinancieraService.getAll();
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTransaccionFinancieraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const transaccion = await transaccionFinancieraService.getById(id);
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const obtenerTransaccionFinancieraPorDescripcion = async (req, res) => {
  try {
    const { descripcion } = req.params;
    const transacciones = await transaccionFinancieraService.getByDescripcion(descripcion);
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarTransaccionFinanciera = async (req, res) => {
  try {
    const { id } = req.params;
    const transaccionActualizada = await transaccionFinancieraService.update(id, req.body);
    res.status(200).json(transaccionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarTransaccionFinanciera = async (req, res) => {
  try {
    const { id } = req.params;
    await transaccionFinancieraService.delete(id);
    res.status(200).json({ message: "Transacción eliminada" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};