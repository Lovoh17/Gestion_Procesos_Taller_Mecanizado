import { Router } from "express";
import {crearMetodoPago, obtenerMetodosPago, obtenerMetodoPagoPorId, actualizarMetodoPago, eliminarMetodoPago} from "./Metodo_Pago.controller.js";

const router = new Router();
router.post("/MetodoPago", crearMetodoPago);
router.get("/MetodoPago", obtenerMetodosPago);
router.get("/MetodoPago/:id", obtenerMetodoPagoPorId);
router.put("/MetodoPago/:id", actualizarMetodoPago);
router.delete("/MetodoPago/:id", eliminarMetodoPago);

export default router;