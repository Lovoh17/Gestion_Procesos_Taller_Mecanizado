import request from "supertest";
import app from "../app.js";

describe("API de Inventario (mock)", () => {
  it("GET /api/inventario/productos debe devolver todos los productos", async () => {
    const res = await request(app).get("/api/inventario/productos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("codigo");
    expect(res.body[0]).toHaveProperty("stock_total");
  });

  it("GET /api/inventario/movimientos debe devolver los movimientos de stock", async () => {
    const res = await request(app).get("/api/inventario/movimientos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("tipo_movimiento");
    expect(["Entrada", "Salida"]).toContain(res.body[0].tipo_movimiento);
  });

  it("Cada movimiento debe tener una fecha válida", async () => {
    const res = await request(app).get("/api/inventario/movimientos");
    expect(res.statusCode).toBe(200);
    res.body.forEach(m => {
      expect(m.fecha_movimiento_formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});


