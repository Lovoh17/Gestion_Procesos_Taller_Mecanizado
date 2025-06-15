import { Router } from "express";
import {crearTipoMateriaPrima, obtenerTipoMateriaPrima, obtenerTipoMateriaPrimaPorId, actualizarTipoMateriaPrima, eliminarTipoMateriaPrima, obtenerTipoMateriaPrimaPorNombre} from "./Tipo_Materia_Prima.controller.js";
const router = Router();

router.post("/Tipo_Materia_Prima", crearTipoMateriaPrima);
router.get("/Tipo_Materia_Prima", obtenerTipoMateriaPrima);
router.get("/Tipo_Materia_Prima/:id", obtenerTipoMateriaPrimaPorId);
router.get("/Tipo_Materia_Prima/nombre/:nombre", obtenerTipoMateriaPrimaPorNombre);
router.put("/Tipo_Materia_Prima/:id", actualizarTipoMateriaPrima);
router.delete("/Tipo_Materia_Prima/:id", eliminarTipoMateriaPrima);

export default router;