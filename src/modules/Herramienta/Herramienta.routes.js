import { Router } from "express";
import {crearHerramienta, obtenerHerramientas, obtenerHerramientaPorId, actualizarHerramienta, eliminarHerramienta, ocuparHerramienta, desOcuparHerramienta} from "./Herramienta.controller.js";

const router = new Router();
router.post("/Herramienta", crearHerramienta);
router.get("/Herramienta", obtenerHerramientas);
router.get("/Herramienta/:id", obtenerHerramientaPorId);
router.put("/Herramienta/:id", actualizarHerramienta);
router.delete("/Herramienta/:id", eliminarHerramienta);
router.get("/HerramientaOcupar/:id/:usuario_id", ocuparHerramienta);
router.get("/HerramientaDesOcupar/:id", desOcuparHerramienta);

export default router;