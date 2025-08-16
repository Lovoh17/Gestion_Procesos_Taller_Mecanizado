import { Router } from "express";
import {crearTipoStock, obtenerTipoStock, obtenerTipoStockPorId, actualizarTipoStock, eliminarTipoStock} from "./Tipo_Stock.controller.js";
const router = Router();

router.post("/Tipo_Stock", crearTipoStock);
router.get("/Tipo_Stock", obtenerTipoStock);
router.get("/Tipo_Stock/:id", obtenerTipoStockPorId);
router.put("/Tipo_Stock/:id", actualizarTipoStock);
router.delete("/Tipo_Stock/:id", eliminarTipoStock);

export default router;