import request from 'supertest';
import app from '../app.js';

describe('API de Trabajos de Operario (mock)', () => {
  it('GET /api/trabajos debe devolver todos los trabajos', async () => {
    const res = await request(app).get('/api/trabajos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/trabajos/1 debe devolver un trabajo específico', async () => {
    const res = await request(app).get('/api/trabajos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Reparación de Motor Principal');
  });

  it('POST /api/trabajos debe crear un nuevo trabajo', async () => {
    const nuevo = {
      titulo: 'Nuevo trabajo',
      estado: 'pendiente',
      prioridad: 'baja',
      cliente: 'Cliente demo'
    };
    const res = await request(app).post('/api/trabajos').send(nuevo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /api/trabajos/:id debe actualizar un trabajo', async () => {
    const res = await request(app)
      .put('/api/trabajos/1')
      .send({ estado: 'completado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.estado).toBe('completado');
  });

  it('DELETE /api/trabajos/:id debe eliminar un trabajo', async () => {
    const res = await request(app).delete('/api/trabajos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Eliminado correctamente');
  });
});
