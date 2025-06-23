import { Router } from "express";
import {crearMantenimiento, obtenerMantenimientos, obtenerMantenimientoPorId, obtenerMantenimientoPorNombre, actualizarMantenimiento, eliminarMantenimiento, obtenerMantenimientosPorTecnico} from "./Mantenimiento.controller.js";

const router = new Router();
router.post("/Mantenimiento", crearMantenimiento);
router.get("/Mantenimiento", obtenerMantenimientos);
router.get("/Mantenimiento/:id", obtenerMantenimientoPorId);
router.get("/Mantenimiento/nombre/:nombre", obtenerMantenimientoPorNombre);
router.put("/Mantenimiento/:id", actualizarMantenimiento);
router.delete("/Mantenimiento/:id", eliminarMantenimiento);
router.get("/Mantenimiento/tecnico/:tecnico_asignado_id", obtenerMantenimientosPorTecnico);


export default router;