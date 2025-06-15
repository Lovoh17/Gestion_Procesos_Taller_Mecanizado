import { Router } from "express";
import {crearPlanoMaterial, obtenerPlanosMaterial, obtenerPlanoMaterialPorId, actualizarPlanoMaterial, eliminarPlanoMaterial} from "./Plano_Material.controller.js";

const router = Router();

router.post("/Plano_Material", crearPlanoMaterial);
router.get("/Plano_Material", obtenerPlanosMaterial);
router.get("/Plano_Material/:id", obtenerPlanoMaterialPorId);
router.put("/Plano_Material/:id", actualizarPlanoMaterial);
router.delete("/Plano_Material/:id", eliminarPlanoMaterial);

export default router;