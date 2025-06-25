import { Router } from "express";
import {crearDetalleEntrega, obtenerDetallesEntrega, obtenerDetalleEntregaPorId, obtenerDetalleEntregaPorNotas, actualizarDetalleEntrega, eliminarDetalleEntrega} from "./Detalle_Entrega.controller.js";

const router = new Router();

router.post("/DetalleEntrega", crearDetalleEntrega);
router.get("/DetalleEntrega", obtenerDetallesEntrega);
router.get("/DetalleEntrega/:id", obtenerDetalleEntregaPorId);
router.get("/DetalleEntrega/notas/:notas", obtenerDetalleEntregaPorNotas);
router.put("/DetalleEntrega/:id", actualizarDetalleEntrega);
router.delete("/DetalleEntrega/:id", eliminarDetalleEntrega);

export default router;