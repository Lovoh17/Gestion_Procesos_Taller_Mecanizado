import { Router } from "express";

import {getAllAsignaciones,getAsignacionById, createAsignacion, updateAsignacion, deleteAsignacion, getAsignacionesByPuestoId, sugerirUsuarios} from './AsignacionInteligente.controller.js';

const router = new Router();

router.get("/Asignaciones", getAllAsignaciones);
router.get("/Asignaciones/:id", getAsignacionById);
router.post("/Asignaciones", createAsignacion);
router.put("/Asignaciones/:id", updateAsignacion);
router.delete("/Asignaciones/:id", deleteAsignacion);
router.get("/Asignaciones/puesto/:puestoId", getAsignacionesByPuestoId);
router.get("/Asignaciones/sugerir/:pedidoId", sugerirUsuarios);

export default router;