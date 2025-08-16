import { Router } from "express";
import {crearPedidoMaterial, obtenerPedidosMaterial, obtenerPedidoMaterialPorId, obtenerPedidoMaterialPorNotas, actualizarPedidoMaterial, eliminarPedidoMaterial} from "./Pedido_Material.controller.js";
const router = Router();

router.post("/Pedido_Material", crearPedidoMaterial);
router.get("/Pedido_Material", obtenerPedidosMaterial);
router.get("/Pedido_Material/:id", obtenerPedidoMaterialPorId);
router.get("/Pedido_Material/notas/:notas", obtenerPedidoMaterialPorNotas);
router.put("/Pedido_Material/:id", actualizarPedidoMaterial);
router.delete("/Pedido_Material/:id", eliminarPedidoMaterial);

export default router;