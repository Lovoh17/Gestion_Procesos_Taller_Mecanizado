import { Router } from "express";
import {crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarPedido, eliminarPedido} from "./Pedido.controller.js";

const router = new Router();

router.post("/Pedido", crearPedido);
router.get("/Pedido", obtenerPedidos);
router.get("/Pedido/:id", obtenerPedidoPorId);
router.put("/Pedido/:id", actualizarPedido);
router.delete("/Pedido/:id", eliminarPedido);

export default router;