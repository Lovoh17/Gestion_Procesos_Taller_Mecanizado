import { Router } from "express";
import {crearUsuarioRol, obtenerUsuarioRolPorId,obtenerUsuarioRolPorNombre,obtenerUsuarioRoles,actualizarUsuarioRol,eliminarUsuarioRol} from "./Usuario_Rol.controller.js";

const router = Router();
router.post("/Usuario_Rol", crearUsuarioRol);
router.get("/Usuario_Rol", obtenerUsuarioRoles);
router.get("/Usuario_Rol/:id", obtenerUsuarioRolPorId);
router.get("/Usuario_Rol/nombre/:nombre", obtenerUsuarioRolPorNombre);
router.put("/Usuario_Rol/:id", actualizarUsuarioRol);
router.delete("/Usuario_Rol/:id", eliminarUsuarioRol);

export default router;