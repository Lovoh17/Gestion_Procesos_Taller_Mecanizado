import { Router } from "express";
import {crearRazonesPP, obtenerRazonesPP, obtenerRazonesPPPorId, actualizarRazonesPP, eliminarRazonesPP} from "./Razones_Pausa_Pedido.controller.js";

const router = Router();

router.post("/Razones_Pausa_Pedido", crearRazonesPP);
router.get("/Razones_Pausa_Pedido", obtenerRazonesPP);
router.get("/Razones_Pausa_Pedido/:id", obtenerRazonesPPPorId);
router.put("/Razones_Pausa_Pedido/:id", actualizarRazonesPP);
router.delete("/Razones_Pausa_Pedido/:id", eliminarRazonesPP);

export default router;