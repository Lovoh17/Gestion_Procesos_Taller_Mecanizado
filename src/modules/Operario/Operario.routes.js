import express from 'express';
import {
  getTrabajos,
  getTrabajoById,
  createTrabajo,
  updateTrabajo,
  deleteTrabajo
} from './Operario.Controller.js';

const router = express.Router();

router.get('/', getTrabajos);
router.get('/:id', getTrabajoById);
router.post('/', createTrabajo);
router.put('/:id', updateTrabajo);
router.delete('/:id', deleteTrabajo);

export default router;
