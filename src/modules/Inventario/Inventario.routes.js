import express from "express";
const router = express.Router();

const productos = [
  {
    id: 1,
    codigo: "MP001",
    nombre: "Acero Inoxidable",
    stock_total: 150,
    unidad_base_id: 1,
    costo_unitario: 25.5,
    estado: "disponible",
    proveedor_principal: "Suministros Industriales SA",
    tipo_materia_prima_id: 2,
    es_controlado: true,
    permite_fraccion: false
  },
  {
    id: 2,
    codigo: "MP002",
    nombre: "Aluminio",
    stock_total: 45,
    unidad_base_id: 1,
    costo_unitario: 15.0,
    estado: "bajo_stock",
    proveedor_principal: "Metales del Norte",
    tipo_materia_prima_id: 3,
    es_controlado: false,
    permite_fraccion: true
  }
];

const movimientos = [
  {
    id: 1,
    producto_id: 1,
    tipo_movimiento: "Entrada",
    cantidad_display: 50,
    pedido_id: null,
    fecha_movimiento_formatted: "2025-10-29"
  },
  {
    id: 2,
    producto_id: 2,
    tipo_movimiento: "Salida",
    cantidad_display: 20,
    pedido_id: 5,
    fecha_movimiento_formatted: "2025-10-28"
  }
];

router.get("/productos", (req, res) => {
  res.status(200).json(productos);
});

router.get("/movimientos", (req, res) => {
  res.status(200).json(movimientos);
});

export default router;
