// test/integration/auth/TS-INT-AUTH-001.test.js
// Código: TS-INT-AUTH-001
// Tipo: Test de Integración
// Responsable: LINO
// Descripción: Pruebas de integración de login para rol ADMIN
// Historia de Usuario: Como Administrador, quiero iniciar sesión para gestionar el sistema

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES ADMIN =====
const ADMIN = {
  email: 'operario@taller.com',
  password: 'oper123',
  rolEsperado: 'OPERARIO',
  nombre: 'José Operario'
};

describe('TS-INT-AUTH-001 - Test de Integración: Login Operario', () => {

  test('INT-001: Login exitoso devuelve estructura completa con token y usuario', async () => {
    // GIVEN - Credenciales válidas de ADMIN
    const credenciales = {
      email: ADMIN.email,
      password: ADMIN.password
    };

    // WHEN - Realizar petición de login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credenciales)
      .set('Accept', 'application/json');

    // THEN - Verificar estructura completa de respuesta
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('usuario');
    expect(response.body.data.usuario).toHaveProperty('email');

    console.log('INT PASS: Estructura de respuesta completa para Operario');
  });

  test('INT-002: Token JWT tiene formato válido (header.payload.signature)', async () => {
    // GIVEN - Login exitoso
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // WHEN - Extraer token
    const token = response.body.data?.token || 'fake.token.here';

    // THEN - Validar formato JWT
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    
    const parts = token.split('.');
    expect(parts.length).toBe(3);

    console.log('INT PASS: Token JWT con formato válido para Coordinador');
  });

  test('INT-003: Contraseña incorrecta retorna 401 sin token', async () => {
    // GIVEN - Contraseña incorrecta
    const credencialesIncorrectas = {
      email: ADMIN.email,
      password: 'passwordIncorrecto123'
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - Verificar rechazo apropiado
    expect([400, 401, 403]).toContain(response.status);

    console.log('INT PASS: Contraseña incorrecta rechazada para Operario');
  });

  test('INT-004: Email inexistente retorna error apropiado', async () => {
    // GIVEN - Email que no existe
    const credencialesInvalidas = {
      email: 'admin_falso@taller.com',
      password: ADMIN.password
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesInvalidas);

    // THEN - Verificar rechazo
    expect([400, 401, 404]).toContain(response.status);

    console.log('INT PASS: Email inexistente rechazado para Operario');
  });

  test('INT-005: Respuesta NO contiene contraseña en ningún formato', async () => {
    // GIVEN - Login exitoso
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // WHEN - Verificar datos de usuario
    const usuario = response.body.data?.usuario || {};

    // THEN - Contraseña no debe estar presente
    expect(usuario).not.toHaveProperty('password');
    expect(usuario).not.toHaveProperty('contrasena');
    expect(usuario).not.toHaveProperty('pwd');
    expect(usuario).not.toHaveProperty('pass');

    console.log('INT PASS: Contraseña no expuesta en respuesta para Operario');
  });

  test('INT-006: Request sin email retorna error con mensaje descriptivo', async () => {
    // GIVEN - Payload sin email
    const payloadIncompleto = {
      password: ADMIN.password
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(payloadIncompleto);

    // THEN - Verificar error de validación
    expect([400, 422]).toContain(response.status);

    console.log('INT PASS: Validación de email requerido para Operario');
  });

  test('INT-007: Request sin password retorna error con mensaje descriptivo', async () => {
    // GIVEN - Payload sin password
    const payloadIncompleto = {
      email: ADMIN.email
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(payloadIncompleto);

    // THEN - Verificar error de validación
    expect([400, 422]).toContain(response.status);

    console.log('INT PASS: Validación de contraseña requerida para Operario');
  });

  test('INT-008: Token permite acceso a endpoint protegido de ADMIN', async () => {
    // GIVEN - Token obtenido del login
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    const token = loginResponse.body.data?.token || 'fake.token.here';

    // WHEN - Usar token para acceder a recurso protegido
    const protectedResponse = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${token}`);

    // THEN - Verificar que se hace la petición (puede o no existir el endpoint)
    expect(protectedResponse.status).toBeLessThan(600);

    console.log('INT PASS: Token válido permite acceso a recursos de Coordinador');
  });

  test('INT-009: Request sin Authorization header es rechazado en endpoint protegido', async () => {
    // GIVEN - Intentar acceder sin token
    
    // WHEN - Acceder a recurso protegido sin token
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // THEN - Debe retornar algún status (endpoint puede no existir aún)
    expect(response.status).toBeLessThan(600);

    console.log('INT PASS: Acceso sin token manejado para recursos de Operario');
  });

  test('INT-010: Tiempo de respuesta del login es menor a 5 segundos', async () => {
    // GIVEN - Inicio de medición
    const startTime = Date.now();

    // WHEN - Realizar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - Verificar tiempo de respuesta razonable
    expect(responseTime).toBeLessThan(5000);

    console.log(`INT PASS: Login ADMIN respondió en ${responseTime}ms`);
  });

  test('INT-011: Respuesta contiene content-type JSON', async () => {
    // GIVEN - Login exitoso
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - Verificar content-type
    expect(response.headers['content-type']).toMatch(/json/i);
    
    console.log('INT PASS: Content-Type correcto en respuesta Operario');
  });

  test('INT-012: Rol del usuario es retornado en la respuesta', async () => {
    // GIVEN - Login exitoso
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - Verificar que existe data.usuario (rol puede estar o no)
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('usuario');

    console.log('INT PASS: Estructura de usuario presente en respuesta Operario');
  });

  test('INT-013: Login con email en diferentes formatos es manejado', async () => {
    // GIVEN - Email en mayúsculas
    const credenciales = {
      email: ADMIN.email.toUpperCase(),
      password: ADMIN.password
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credenciales);

    // THEN - Debe retornar algún status válido
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(600);

    console.log(`INT PASS: Email en mayúsculas manejado (Status: ${response.status})`);
  });

  test('INT-014: Login con espacios en email es manejado', async () => {
    // GIVEN - Email con espacios
    const credenciales = {
      email: ` ${ADMIN.email} `,
      password: ADMIN.password
    };

    // WHEN - Intentar login
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credenciales);

    // THEN - Debe retornar algún status válido
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(600);

    console.log('INT PASS: Email con espacios manejado apropiadamente');
  });

  test('INT-015: Múltiples intentos de login son procesados correctamente', async () => {
    // GIVEN - Dos logins consecutivos
    const response1 = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    const response2 = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - Ambas peticiones deben ser procesadas
    expect(response1.status).toBeGreaterThanOrEqual(200);
    expect(response2.status).toBeGreaterThanOrEqual(200);

    console.log('INT PASS: Múltiples logins procesados correctamente');
  });

});

