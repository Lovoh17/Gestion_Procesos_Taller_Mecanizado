import request from "supertest";
import app from "../app.js";

describe("API de Dashboard de Operario (mock)", () => {
  it("GET /api/trabajos/dashboard/operario/:id debe devolver los datos del dashboard", async () => {
    const res = await request(app).get("/api/trabajos/dashboard/operario/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("pedidos");
    expect(res.body).toHaveProperty("herramientas");
    expect(Array.isArray(res.body.pedidos)).toBe(true);
    expect(typeof res.body.herramientas.total).toBe("number");
  });

  it("GET /api/trabajos/dashboard/operario/:id debe incluir pedidos con estados válidos", async () => {
    const res = await request(app).get("/api/trabajos/dashboard/operario/1");
    expect(res.statusCode).toBe(200);

    const estadosValidos = ["pendiente", "en_proceso", "completado"];
    res.body.pedidos.forEach(pedido => {
      expect(estadosValidos).toContain(pedido.estado);
    });
  });

  it("GET /api/trabajos/dashboard/operario/:id inválido debe devolver error 400", async () => {
    const res = await request(app).get("/api/trabajos/dashboard/operario/abc");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});


