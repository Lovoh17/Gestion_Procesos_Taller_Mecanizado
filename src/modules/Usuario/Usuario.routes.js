import { Router } from "express";
import {crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario, obtenerUsuariosPorIdPuesto, obtenerUsuarioDisponible} from "./Usuario.controller.js";
const router = Router();

router.post("/Usuario", crearUsuario);
router.get("/Usuario", obtenerUsuarios);
router.get("/Usuario/:id", obtenerUsuarioPorId);
router.put("/Usuario/:id", actualizarUsuario);
router.delete("/Usuario/:id", eliminarUsuario);
router.get("/Usuario/Puesto/:puesto_id", obtenerUsuariosPorIdPuesto);
router.get("/Usuarios/Asignados", obtenerUsuarioDisponible);

export default router;