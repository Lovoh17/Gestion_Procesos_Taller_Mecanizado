import { Router } from "express";
import {crearTipoTransaccion, obtenerTiposTransaccion, obtenerTipoTransaccionPorId, actualizarTipoTransaccion, eliminarTipoTransaccion} from "./Tipo_Transaccion.controller.js";
const router = Router();

router.post("/Tipos_Transaccion", crearTipoTransaccion);
router.get("/Tipos_Transaccion", obtenerTiposTransaccion);
router.get("/Tipos_Transaccion/:id", obtenerTipoTransaccionPorId);
router.put("/Tipos_Transaccion/:id", actualizarTipoTransaccion);
router.delete("/Tipos_Transaccion/:id", eliminarTipoTransaccion);

export default router;