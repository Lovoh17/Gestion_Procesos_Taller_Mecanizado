import { Router } from "express";
import {crearRazonesPP, obtenerRazonesPP, obtenerRazonesPPPorId, actualizarRazonesPP, eliminarRazonesPP} from "./Razon_Pausa_Pedido.controller.js";

const router = Router();

router.post("/Razon_Pausa_Pedido", crearRazonesPP);
router.get("/Razon_Pausa_Pedido", obtenerRazonesPP);
router.get("/Razon_Pausa_Pedido/:id", obtenerRazonesPPPorId);
router.put("/Razon_Pausa_Pedido/:id", actualizarRazonesPP);
router.delete("/Razon_Pausa_Pedido/:id", eliminarRazonesPP);

export default router;