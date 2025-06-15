import { Router } from "express";
import {crearRol, obtenerRoles, obtenerRolPorId, actualizarRol, eliminarRol} from "./Rol.controller.js";
const router = Router();

router.post("/Rol", crearRol);
router.get("/Rol", obtenerRoles);
router.get("/Rol/:id", obtenerRolPorId);
router.put("/Rol/:id", actualizarRol);
router.delete("/Rol/:id", eliminarRol);

export default router;

