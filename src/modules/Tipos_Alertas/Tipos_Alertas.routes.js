import { Router } from "express";
import {crearTiposAlerta, obtenerTipoAlerta, obtenerTipoAlertaPorId, actualizarTipoAlerta, eliminarTipoAlerta} from "./Tipos_Alertas.controller.js";
const router = Router();

router.post("/Tipos_Alertas", crearTiposAlerta);
router.get("/Tipos_Alertas", obtenerTipoAlerta);
router.get("/Tipos_Alertas/:id", obtenerTipoAlertaPorId);
router.put("/Tipos_Alertas/:id", actualizarTipoAlerta);
router.delete("/Tipos_Alertas/:id", eliminarTipoAlerta);

export default router;