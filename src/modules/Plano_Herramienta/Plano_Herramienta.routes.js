import { Router } from "express";
import {crearPlanoHerramienta, obtenerPlanosHerramienta, obtenerPlanoHerramientaPorId, actualizarPlanoHerramienta, eliminarPlanoHerramienta} from "./Plano_Herramienta.controller.js";

const router = Router();

router.post("/Plano_Herramienta", crearPlanoHerramienta);
router.get("/Plano_Herramienta", obtenerPlanosHerramienta);
router.get("/Plano_Herramienta/:id", obtenerPlanoHerramientaPorId);
router.put("/Plano_Herramienta/:id", actualizarPlanoHerramienta);
router.delete("/Plano_Herramienta/:id", eliminarPlanoHerramienta);

export default router;