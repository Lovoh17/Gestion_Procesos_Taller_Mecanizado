import { Router } from "express";
import {crearUsuarioRol, obtenerUsuarioRolPorId,obtenerUsuarioRolPorNombre,obtenerUsuarioRoles,actualizarUsuarioRol,eliminarUsuarioRol} from "./Usuario_Roles.controller.js";

const router = Router();
router.post("/Usuario_Roles", crearUsuarioRol);
router.get("/Usuario_Roles", obtenerUsuarioRoles);
router.get("/Usuario_Roles/:id", obtenerUsuarioRolPorId);
router.get("/Usuario_Roles/nombre/:nombre", obtenerUsuarioRolPorNombre);
router.put("/Usuario_Roles/:id", actualizarUsuarioRol);
router.delete("/Usuario_Roles/:id", eliminarUsuarioRol);

export default router;