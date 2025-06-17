import { Router } from "express";
import {crearEstadoReparacion, obtenerEstadosReparacion, obtenerEstadosReparacionPorId, actualizarEstadoReparacion, eliminarEstadoReparacion} from "./Estado_Reparacion.controller.js";

const router = new Router();

router.post("/EstadoReparacion", crearEstadoReparacion);
router.get("/EstadoReparacion", obtenerEstadosReparacion);
router.get("/EstadoReparacion/:id", obtenerEstadosReparacionPorId);
router.put("/EstadoReparacion/:id", actualizarEstadoReparacion);
router.delete("/EstadoReparacion/:id", eliminarEstadoReparacion);

export default router;