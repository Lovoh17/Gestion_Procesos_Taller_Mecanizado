import { Router } from "express";
import {crearEstadoEntrega, obtenerEstadoEntrega, obtenerEstadoEntregaPorId, actualizarEstadoEntrega, eliminarEstadoEntrega} from "./Estado_Entrega.controller.js";

const router = new Router();
router.post("/EstadoEntrega", crearEstadoEntrega);
router.get("/EstadoEntrega", obtenerEstadoEntrega);
router.get("/EstadoEntrega/:id", obtenerEstadoEntregaPorId);
router.put("/EstadoEntrega/:id", actualizarEstadoEntrega);
router.delete("/EstadoEntrega/:id", eliminarEstadoEntrega);

export default router;