import { rolService } from "./Rol.service.js";

export const crearRol = async (req, res) => {
  try {
    const nuevoRol = await rolService.create(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolService.getAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerRolPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await rolService.getById(id);
    res.status(200).json(rol);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rolActualizado = await rolService.update(id, req.body);
    res.status(200).json(rolActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarRol = async (req, res) => {
  try {
    const { id } = req.params;
    await rolService.delete(id);
    res.status(200).json({ message: "Rol eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};