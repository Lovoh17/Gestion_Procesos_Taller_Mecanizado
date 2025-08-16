import { Router } from "express";
import {crearUnidadMedida, obtenerUnidadMedida, obtenerUnidadMedidaPorId, actualizarUnidadMedida, eliminarUnidadMedida} from "./Unidad_Medida.controller.js";
const router = Router();

router.post("/Unidad_Medida", crearUnidadMedida);
router.get("/Unidad_Medida", obtenerUnidadMedida);
router.get("/Unidad_Medida/:id", obtenerUnidadMedidaPorId);
router.put("/Unidad_Medida/:id", actualizarUnidadMedida);
router.delete("/Unidad_Medida/:id", eliminarUnidadMedida);

export default router;