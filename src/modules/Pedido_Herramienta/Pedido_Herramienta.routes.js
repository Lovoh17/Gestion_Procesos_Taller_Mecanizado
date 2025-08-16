import { Router } from "express";
import {crearPedidoHerramienta, obtenerPedidosHerramienta, obtenerPedidoHerramientaPorId, obtenerPedidoHerramientaPorNotas, actualizarPedidoHerramienta, eliminarPedidoHerramienta} from "./Pedido_Herramienta.controller.js";

const router = Router();

router.post("/Pedido_Herramienta", crearPedidoHerramienta);
router.get("/Pedido_Herramienta", obtenerPedidosHerramienta);
router.get("/Pedido_Herramienta/:id", obtenerPedidoHerramientaPorId);
router.get("/Pedido_Herramienta/notas/:notas", obtenerPedidoHerramientaPorNotas);
router.put("/Pedido_Herramienta/:id", actualizarPedidoHerramienta);
router.delete("/Pedido_Herramienta/:id", eliminarPedidoHerramienta);

export default router;

