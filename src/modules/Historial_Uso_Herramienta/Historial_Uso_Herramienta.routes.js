import { Router } from "express";
import {crearHistorialUsoHerramienta, obtenerHistorialUsoHerramientas, obtenerHistorialUsoHerramientaPorId, obtenerHistorialUsoHerramientaPorNotas, actualizarHistorialUsoHerramienta, eliminarHistorialUsoHerramienta} from "./Historial_Uso_Herramienta.controller.js";

const router = new Router();
router.post("/HistorialUsoHerramienta", crearHistorialUsoHerramienta);
router.get("/HistorialUsoHerramienta", obtenerHistorialUsoHerramientas);
router.get("/HistorialUsoHerramienta/:id", obtenerHistorialUsoHerramientaPorId);
router.get("/HistorialUsoHerramienta/notas/:notas", obtenerHistorialUsoHerramientaPorNotas);
router.put("/HistorialUsoHerramienta/:id", actualizarHistorialUsoHerramienta);
router.delete("/HistorialUsoHerramienta/:id", eliminarHistorialUsoHerramienta);

export default router;