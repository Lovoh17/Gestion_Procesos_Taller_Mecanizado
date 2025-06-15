import { Router } from "express";
import {crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} from "./Usuario.controller.js";
const router = Router();

router.post("/Usuario", crearUsuario);
router.get("/Usuario", obtenerUsuarios);
router.get("/Usuario/:id", obtenerUsuarioPorId);
router.put("/Usuario/:id", actualizarUsuario);
router.delete("/Usuario/:id", eliminarUsuario);

export default router;