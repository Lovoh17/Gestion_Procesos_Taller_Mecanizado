import { Router } from "express";
import {crearEstadoTransaccion, obtenerEstadoTransaccion, obtenerEstadoTransaccionPorId, actualizarEstadoTransaccion, eliminarZonaTrabajo} from "./Estado_Transaccion.controller.js";

const router = new Router();

router.post("/EstadoTransaccion", crearEstadoTransaccion);
router.get("/EstadoTransaccion", obtenerEstadoTransaccion);
router.get("/EstadoTransaccion/:id", obtenerEstadoTransaccionPorId);
router.put("/EstadoTransaccion/:id", actualizarEstadoTransaccion);
router.delete("/EstadoTransaccion/:id", eliminarZonaTrabajo);

export default router;