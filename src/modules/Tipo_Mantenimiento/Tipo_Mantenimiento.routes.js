import { Router } from "express";
import {crearTipoMantenimiento, obtenerTiposMantenimiento, obtenerTipoMantenimientoPorId, actualizarTipoMantenimiento, eliminarTipoMantenimiento} from "./Tipo_Mantenimiento.controller.js";
const router = Router();

router.post("/Tipo_Mantenimiento", crearTipoMantenimiento);
router.get("/Tipo_Mantenimiento", obtenerTiposMantenimiento);
router.get("/Tipo_Mantenimiento/:id", obtenerTipoMantenimientoPorId);
router.put("/Tipo_Mantenimiento/:id", actualizarTipoMantenimiento);
router.delete("/Tipo_Mantenimiento/:id", eliminarTipoMantenimiento);

export default router;