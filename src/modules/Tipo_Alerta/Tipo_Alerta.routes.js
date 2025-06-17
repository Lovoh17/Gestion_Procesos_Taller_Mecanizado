import { Router } from "express";
import {crearTiposAlerta, obtenerTipoAlerta, obtenerTipoAlertaPorId, actualizarTipoAlerta, eliminarTipoAlerta, obtenerTipoAlertaPorNombre} from "./Tipo_Alerta.controller.js";
const router = Router();

router.post("/Tipo_Alerta", crearTiposAlerta);
router.get("/Tipos_Alertas", obtenerTipoAlerta);
router.get("/Tipo_Alerta/:id", obtenerTipoAlertaPorId);
router.put("/Tipo_Alerta/:id", actualizarTipoAlerta);
router.delete("/Tipo_Alerta/:id", eliminarTipoAlerta);
router.get("/Tipo_Alerta/:nombre_alertas", obtenerTipoAlertaPorNombre);

export default router;