import { Router } from "express";
import {crearTipoTelefono, obtenerTipoTelefono, obtenerTipoTelefonoPorId, actualizarTipoTelefono, eliminarTipoTelefono} from "./Tipo_Telefono.controller.js";
const router = Router();

router.post("/Tipo_Telefono", crearTipoTelefono);
router.get("/Tipo_Telefono", obtenerTipoTelefono);
router.get("/Tipo_Telefono/:id", obtenerTipoTelefonoPorId);
router.put("/Tipo_Telefono/:id", actualizarTipoTelefono);
router.delete("/Tipo_Telefono/:id", eliminarTipoTelefono);

export default router;