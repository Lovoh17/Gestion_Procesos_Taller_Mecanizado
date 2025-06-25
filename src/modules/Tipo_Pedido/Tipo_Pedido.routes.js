import { Router } from "express";
import {crearTipoPedido, obtenerTipoPedido, obtenerTipoPedidoPorId, actualizarTipoPedido, eliminarTipoPedido} from "./Tipo_Pedido.controller.js";
const router = Router();

router.post("/Tipo_Pedido", crearTipoPedido);
router.get("/Tipo_Pedido", obtenerTipoPedido);
router.get("/Tipo_Pedido/:id", obtenerTipoPedidoPorId);
router.put("/Tipo_Pedido/:id", actualizarTipoPedido);
router.delete("/Tipo_Pedido/:id", eliminarTipoPedido);

export default router;