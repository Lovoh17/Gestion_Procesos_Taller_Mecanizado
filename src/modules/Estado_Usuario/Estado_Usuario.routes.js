import { Router } from "express";
import {crearEstadoUsuario, obtenerEstadoUsuario, obtenerEstadoUsuarioPorId, obtenerEstadoUsuarioPorNombre, actualizarEstadoUsuario, eliminarEstadoUsuario} from "./Estado_Usuario.controller.js";

const router = new Router();

router.post("/EstadoUsuario", crearEstadoUsuario);
router.get("/EstadoUsuario", obtenerEstadoUsuario);
router.get("/EstadoUsuario/:id", obtenerEstadoUsuarioPorId);
router.get("/EstadoUsuario/nombre/:nombre", obtenerEstadoUsuarioPorNombre);
router.put("/EstadoUsuario/:id", actualizarEstadoUsuario);
router.delete("/EstadoUsuario/:id", eliminarEstadoUsuario);

export default router;