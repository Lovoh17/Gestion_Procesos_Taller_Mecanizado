import { Router } from "express";
import {crearTransaccionFinanciera, obtenerTransaccionesFinancieras, obtenerTransaccionFinancieraPorId, actualizarTransaccionFinanciera, eliminarTransaccionFinanciera} from "./Transaccion_Financiera.controller.js";
const router = Router();

router.post("/Transaccion_Financiera", crearTransaccionFinanciera);
router.get("/Transaccion_Financiera", obtenerTransaccionesFinancieras);
router.get("/Transaccion_Financiera/:id", obtenerTransaccionFinancieraPorId);
router.put("/Transaccion_Financiera/:id", actualizarTransaccionFinanciera);
router.delete("/Transaccion_Financiera/:id", eliminarTransaccionFinanciera);

export default router;