import { Router } from "express";
import {crearEntregaPedido, obtenerEntregasPedido, obtenerEntregaPedidoPorId, obtenerEntregaPedidoPorNotas, actualizarEntregaPedido, eliminarEntregaPedido} from "./Entrega_Pedido.controller.js";

const router = new Router();

router.post("/EntregaPedido", crearEntregaPedido);
router.get("/EntregaPedido", obtenerEntregasPedido);
router.get("/EntregaPedido/:id", obtenerEntregaPedidoPorId);
router.get("/EntregaPedido/notas/:notas", obtenerEntregaPedidoPorNotas);
router.put("/EntregaPedido/:id", actualizarEntregaPedido);
router.delete("/EntregaPedido/:id", eliminarEntregaPedido);

export default router;