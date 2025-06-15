import { Router } from "express";
import {crearPuesto, obtenerPuestos, obtenerPuestoPorId, obtenerPuestoPorNombre, actualizarPuesto, eliminarPuesto} from "./Puesto.controller.js";

const router = Router();

router.post("/Puesto", crearPuesto);
router.get("/Puesto", obtenerPuestos);
router.get("/Puesto/:id", obtenerPuestoPorId);
router.get("/Puesto/nombre/:nombre", obtenerPuestoPorNombre);
router.put("/Puesto/:id", actualizarPuesto);
router.delete("/Puesto/:id", eliminarPuesto);

export default router;