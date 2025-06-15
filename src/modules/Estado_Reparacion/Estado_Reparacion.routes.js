import { Router } from "express";
import {crearEstadoReparacion, obtenerEstadosReparacion, obtenerEstadosReparacionPorId, obtenerEstadoReparacionPorNombre, actualizarEstadoTrabajo, eliminarEstadoTrabajo} from "./Estado_Reparacion.controller.js";

const router = new Router();

router.post("/EstadoReparacion", crearEstadoReparacion);
router.get("/EstadoReparacion", obtenerEstadosReparacion);
router.get("/EstadoReparacion/:id", obtenerEstadosReparacionPorId);
router.get("/EstadoReparacion/nombre/:nombre", obtenerEstadoReparacionPorNombre);
router.put("/EstadoReparacion/:id", actualizarEstadoTrabajo);
router.delete("/EstadoReparacion/:id", eliminarEstadoTrabajo);

export default router;