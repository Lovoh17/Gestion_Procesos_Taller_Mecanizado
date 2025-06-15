import { Router } from "express";
import {crearEstadoMantenimiento, obtenerEstadosMantenimiento, obtenerEstadoMantenimientoPorId, actualizarEstadoMantenimiento, eliminarEstadoMantenimiento} from "./Estado_Mantenimiento.controller.js";

const router = new Router();

router.post("/EstadoMantenimiento", crearEstadoMantenimiento);
router.get("/EstadoMantenimiento", obtenerEstadosMantenimiento);
router.get("/EstadoMantenimiento/:id", obtenerEstadoMantenimientoPorId);
router.put("/EstadoMantenimiento/:id", actualizarEstadoMantenimiento);
router.delete("/EstadoMantenimiento/:id", eliminarEstadoMantenimiento);

export default router;