import Operario from './Operario.js';
const operario = new Operario();

export const getTrabajos = (req, res) => {
  res.json(operario.getAll());
};

export const getTrabajoById = (req, res) => {
  const trabajo = operario.getById(parseInt(req.params.id));
  if (!trabajo) return res.status(404).json({ message: 'Trabajo no encontrado' });
  res.json(trabajo);
};

export const createTrabajo = (req, res) => {
  const nuevo = operario.create(req.body);
  res.status(201).json(nuevo);
};

export const updateTrabajo = (req, res) => {
  const actualizado = operario.update(parseInt(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ message: 'No encontrado' });
  res.json(actualizado);
};

export const deleteTrabajo = (req, res) => {
  const eliminado = operario.delete(parseInt(req.params.id));
  if (!eliminado) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado correctamente' });
};

export const getDashboardOperario = (req, res) => {
  const idOperario = parseInt(req.params.id);
  if (isNaN(idOperario)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const trabajos = operario.getAll();

  const dashboardData = {
    pedidos: trabajos.map(t => ({
      asignacionId: t.id,
      titulo: t.titulo,
      estado: t.estado,
      prioridad: t.prioridad,
      cliente: t.cliente
    })),
    herramientas: {
      total: 10 
    }
  };

  res.json(dashboardData);
};
