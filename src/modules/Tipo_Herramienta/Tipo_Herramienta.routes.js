import { Router } from "express";
import {crearTipoHerramienta, obtenerTipoHerramienta, obtenerTipoHerramientaPorId, actualizarTipoHerramienta, eliminarTipoHerramienta} from "./Tipo_Herramienta.controller.js";
const router = Router();

router.post("/Tipo_Herramienta", crearTipoHerramienta);
router.get("/Tipo_Herramienta", obtenerTipoHerramienta);
router.get("/Tipo_Herramienta/:id", obtenerTipoHerramientaPorId);
router.put("/Tipo_Herramienta/:id", actualizarTipoHerramienta);
router.delete("/Tipo_Herramienta/:id", eliminarTipoHerramienta);

export default router;