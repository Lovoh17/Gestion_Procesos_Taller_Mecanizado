import { Router } from "express";
import {crearEstadoHerramienta, obtenerEstadoHerramienta, obtenerEstadoHerramientaPorId, obtenerEstadoHerramientaPorNombre, actualizarEstadoHerramienta, eliminarEstadoHerramienta} from "./Estado_Herramienta.controller.js";

const router = new Router();

router.post("/EstadoHerramienta", crearEstadoHerramienta);
router.get("/EstadoHerramienta", obtenerEstadoHerramienta);
router.get("/EstadoHerramienta/:id", obtenerEstadoHerramientaPorId);
router.get("/EstadoHerramienta/nombre/:nombre", obtenerEstadoHerramientaPorNombre);
router.put("/EstadoHerramienta/:id", actualizarEstadoHerramienta);
router.delete("/EstadoHerramienta/:id", eliminarEstadoHerramienta);

export default router;