import { Router } from "express";
import {crearPrioridadMantenimiento, obtenerPrioridadesMantenimiento, obtenerPrioridadMantenimientoPorId, actualizarPrioridadMantenimiento, eliminarPrioridadMantenimiento} from "./Prioridad_Mantenimiento.controller.js";
const router = Router();

router.post("/Prioridad_Mantenimiento", crearPrioridadMantenimiento);
router.get("/Prioridad_Mantenimiento", obtenerPrioridadesMantenimiento);
router.get("/Prioridad_Mantenimiento/:id", obtenerPrioridadMantenimientoPorId);
router.put("/Prioridad_Mantenimiento/:id", actualizarPrioridadMantenimiento);
router.delete("/Prioridad_Mantenimiento/:id", eliminarPrioridadMantenimiento);

export default router;