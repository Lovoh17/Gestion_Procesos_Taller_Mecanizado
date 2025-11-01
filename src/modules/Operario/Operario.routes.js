import express from 'express';
import {
  getTrabajos,
  getTrabajoById,
  createTrabajo,
  updateTrabajo,
  deleteTrabajo,
  getDashboardOperario
} from './Operario.Controller.js';

const router = express.Router();

router.get('/', getTrabajos);
router.get('/:id', getTrabajoById);
router.post('/', createTrabajo);
router.put('/:id', updateTrabajo);
router.delete('/:id', deleteTrabajo);

router.get('/dashboard/operario/:id', getDashboardOperario);

export default router;
