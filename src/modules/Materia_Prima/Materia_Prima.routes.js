import { Router } from "express";
import {crearMateriaPrima, obtenerMateriasPrima, obtenerMateriaPrimaPorId, actualizarMateriaPrima, eliminarMateriaPrima} from "./Materia_Prima.controller.js";

const router = new Router();
router.post("/MateriaPrima", crearMateriaPrima);
router.get("/MateriaPrima", obtenerMateriasPrima);
router.get("/MateriaPrima/:id", obtenerMateriaPrimaPorId);
router.put("/MateriaPrima/:id", actualizarMateriaPrima);
router.delete("/MateriaPrima/:id", eliminarMateriaPrima);

export default router;