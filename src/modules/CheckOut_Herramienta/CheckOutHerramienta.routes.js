import { Router } from "express";
import { obtenertodosCOH, obtenerCOHPorId, crearCOH, actualizarCOH, eliminarCOH, obtenerTODOSCOH, getEstadisticasHerramientas } from "./CheckOutHerramienta.controller.js";

const router = new Router();
router.post("/CheckOutHerramienta", crearCOH);
router.get("/CheckOutHerramienta", obtenertodosCOH);
router.get("/CheckOutHerramienta/:id", obtenerCOHPorId);
router.put("/CheckOutHerramienta/:id", actualizarCOH);
router.delete("/CheckOutHerramienta/:id", eliminarCOH);
router.get("/CheckOutHerramientaForce/", obtenerTODOSCOH);
router.get("/CheckOutHerramienta/estadisticas", getEstadisticasHerramientas);

export default router;