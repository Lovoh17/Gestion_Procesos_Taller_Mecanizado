import { Router } from "express";
import {crearDetalleTransaccion, obtenerDetallesTransaccion, obtenerDetalleTransaccionPorId, obtenerDetalleTransaccionPorConcepto, actualizarDetalleTransaccion, eliminarDetalleTransaccion} from "./Detalle_Transaccion.controller.js";

const router = new Router();

router.post("/DetalleTransaccion", crearDetalleTransaccion);
router.get("/DetalleTransaccion", obtenerDetallesTransaccion);
router.get("/DetalleTransaccion/:id", obtenerDetalleTransaccionPorId);
router.get("/DetalleTransaccion/concepto/:concepto", obtenerDetalleTransaccionPorConcepto);
router.put("/DetalleTransaccion/:id", actualizarDetalleTransaccion);
router.delete("/DetalleTransaccion/:id", eliminarDetalleTransaccion);

export default router;
