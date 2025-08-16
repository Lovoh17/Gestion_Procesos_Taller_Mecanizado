import { Router } from "express";
import {crearPermiso, obtenerPermisos, obtenerPermisoPorId, actualizarPermiso, eliminarPermiso} from "./Permisos.controller.js";

const router = Router();

router.post("/Permisos", crearPermiso);
router.get("/Permisos", obtenerPermisos);
router.get("/Permisos/:id", obtenerPermisoPorId);
router.put("/Permisos/:id", actualizarPermiso);
router.delete("/Permisos/:id", eliminarPermiso);

export default router;