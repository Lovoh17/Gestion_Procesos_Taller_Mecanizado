import { Router } from "express";
import {crearZonaTrabajo, obtenerZonasTrabajo, obtenerZonaTrabajoPorId, actualizarZonaTrabajo, eliminarZonaTrabajo} from "./Zona_Trabajo.controller.js";
const router = Router();

router.post("/Zona_Trabajo", crearZonaTrabajo);
router.get("/Zona_Trabajo", obtenerZonasTrabajo);
router.get("/Zona_Trabajo/:id", obtenerZonaTrabajoPorId);
router.put("/Zona_Trabajo/:id", actualizarZonaTrabajo);
router.delete("/Zona_Trabajo/:id", eliminarZonaTrabajo);

export default router;