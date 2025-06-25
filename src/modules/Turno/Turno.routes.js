import { Router } from "express";
import {crearTurno, obtenerTurnos, obtenerTurnoPorId, actualizarTurno, eliminarTurno} from "./Turno.controller.js";
const router = Router();

router.post("/Turno", crearTurno);
router.get("/Turno", obtenerTurnos);
router.get("/Turno/:id", obtenerTurnoPorId);
router.put("/Turno/:id", actualizarTurno);
router.delete("/Turno/:id", eliminarTurno);

export default router;