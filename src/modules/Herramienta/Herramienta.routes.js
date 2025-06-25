import { Router } from "express";
import {crearHerramienta, obtenerHerramientas, obtenerHerramientaPorId, actualizarHerramienta, eliminarHerramienta} from "./Herramienta.controller.js";

const router = new Router();
router.post("/Herramienta", crearHerramienta);
router.get("/Herramienta", obtenerHerramientas);
router.get("/Herramienta/:id", obtenerHerramientaPorId);
router.put("/Herramienta/:id", actualizarHerramienta);
router.delete("/Herramienta/:id", eliminarHerramienta);

export default router;