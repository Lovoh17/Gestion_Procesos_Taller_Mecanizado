import { Router } from "express";
import {crearTelefonoUsuario, obtenerTelefonosUsuario, obtenerTelefonoUsuarioPorId, actualizarTelefonoUsuario, eliminarTelefonoUsuario} from "./Telefono_Usuario.controller.js";
const router = Router();

router.post("/Telefono_Usuario", crearTelefonoUsuario);
router.get("/Telefono_Usuario", obtenerTelefonosUsuario);
router.get("/Telefono_Usuario/:id", obtenerTelefonoUsuarioPorId);
router.put("/Telefono_Usuario/:id", actualizarTelefonoUsuario);
router.delete("/Telefono_Usuario/:id", eliminarTelefonoUsuario);

export default router;