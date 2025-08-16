import { Router } from "express";
import {crearAlertaReparacion, obtenerAlertasReparacion, obtenerAlertaReparacionPorId, obtenerAlertaReparacionPorDescripcion, actualizarAlertaReparacion, eliminarAlertaReparacion} from "./Alerta_Reparacion.controller.js";

const router = new Router();

router.post("/AlertaReparacion", crearAlertaReparacion);
router.get("/AlertaReparacion", obtenerAlertasReparacion);
router.get("/AlertaReparacion/:id", obtenerAlertaReparacionPorId);
router.get("/AlertaReparacion/descripcion/:descripcion", obtenerAlertaReparacionPorDescripcion);
router.put("/AlertaReparacion/:id", actualizarAlertaReparacion);
router.delete("/AlertaReparacion/:id", eliminarAlertaReparacion);

export default router;