import { Router } from "express";
import {crearHistorialMovimientoStock, obtenerHistorialesMovimientoStock, obtenerHistorialMovimientoStockPorId, actualizarHistorialMovimientoStock, eliminarHistorialMovimientoStock} from "./Historial_Movimiento_Stock.controller.js";

const router = new Router();

router.post("/Historial_Movimiento_Stock", crearHistorialMovimientoStock);
router.get("/Historial_Movimiento_Stock", obtenerHistorialesMovimientoStock);
router.get("/Historial_Movimiento_Stock/:id", obtenerHistorialMovimientoStockPorId);
router.put("/Historial_Movimiento_Stock/:id", actualizarHistorialMovimientoStock);
router.delete("/Historial_Movimiento_Stock/:id", eliminarHistorialMovimientoStock);

export default router;