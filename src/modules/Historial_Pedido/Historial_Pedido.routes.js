import { Router } from "express";
import {crearHistorialPedido, obtenerHistorialPedidos, obtenerHistorialPedidoPorId,obtenerHistorialPedidoPorDescripcion,actualizarHistorialPedido, eliminarHistorialPedido} from "./Historial_Pedido.controller.js";

const router = new Router();

router.post("/Historial_Pedido", crearHistorialPedido);
router.get("/Historial_Pedido", obtenerHistorialPedidos);
router.get("/Historial_Pedido/:id", obtenerHistorialPedidoPorId);
router.get("/Historial_Pedido/descripcion/:descripcion", obtenerHistorialPedidoPorDescripcion);
router.put("/Historial_Pedido/:id", actualizarHistorialPedido);
router.delete("/Historial_Pedido/:id", eliminarHistorialPedido);

export default router;