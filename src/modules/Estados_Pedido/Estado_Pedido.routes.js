import { Router } from "express";
import {crearEstadoPedido, obtenerEstadoPedido, obtenerEstadoPedidoPorId, actualizarEstadoPedido, eliminarEstadoPedido} from "./Estado_Pedido.controller.js";

const router = new Router();

router.post("/EstadoPedido", crearEstadoPedido);
router.get("/EstadoPedido", obtenerEstadoPedido);
router.get("/EstadoPedido/:id", obtenerEstadoPedidoPorId);
router.put("/EstadoPedido/:id", actualizarEstadoPedido);
router.delete("/EstadoPedido/:id", eliminarEstadoPedido);

export default router;