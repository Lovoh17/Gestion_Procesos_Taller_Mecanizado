import { Router } from "express";
import {crearEstadoDevolucion, obtenerEstadoDevolucion, obtenerEstadoDevolucionPorId, actualizarEstadoDevolucion, eliminarEstadoDevolucion} from "./Estado_Devolucion.controller.js";

const router = new Router();

router.post("/EstadoDevolucion", crearEstadoDevolucion);
router.get("/EstadoDevolucion", obtenerEstadoDevolucion);
router.get("/EstadoDevolucion/:id", obtenerEstadoDevolucionPorId);
router.put("/EstadoDevolucion/:id", actualizarEstadoDevolucion);
router.delete("/EstadoDevolucion/:id", eliminarEstadoDevolucion);

export default router;