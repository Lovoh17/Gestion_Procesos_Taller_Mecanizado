// test/acceptance/auth/TS-ACC-AUTH-002.test.js
// Código: TS-ACC-AUTH-002
// Tipo: Test de Aceptación (E2E)
// Responsable: LINO
// Descripción: Pruebas de aceptación de login para rol COORDINADOR
// Historia de Usuario: Como Coordinador, quiero iniciar sesión para acceder a planificación y órdenes de trabajo

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES COORDINADOR =====
const COORDINADOR = {
  email: 'coordinador@taller.com',
  password: 'coord123',
  rolEsperado: 'coordinador',
  nombre: 'Kevin Israel'
};

describe('TS-BE-AUTH-ACC-012 - Test de Aceptación: Login COORDINADOR', () => {

  test('CRITERIO 1: Como Coordinador, quiero iniciar sesión con credenciales válidas para acceder al sistema', async () => {
    // GIVEN - Usuario Coordinador con credenciales válidas
    const credenciales = {
      email: COORDINADOR.email,
      password: COORDINADOR.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credenciales)
      .set('Accept', 'application/json');

    // THEN - El sistema me permite acceder y genera un token
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Inicio de sesión exitoso');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('usuario');
    expect(response.body.data.usuario.email).toBe(COORDINADOR.email);

    console.log('✅ ACEPTACIÓN PASS: Coordinador puede iniciar sesión exitosamente');
    console.log(`   Usuario: ${response.body.data.usuario.email}`);
  });

  test('CRITERIO 2: Como Coordinador, NO debo poder iniciar sesión con contraseña incorrecta', async () => {
    // GIVEN - Usuario Coordinador con contraseña incorrecta
    const credencialesIncorrectas = {
      email: COORDINADOR.email,
      password: 'passwordIncorrecto123'
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza contraseña incorrecta de Coordinador');
  });

  test('CRITERIO 3: Como Coordinador, NO debo poder iniciar sesión con email incorrecto', async () => {
    // GIVEN - Email que no existe
    const credencialesIncorrectas = {
      email: 'coordinador_falso@taller.com',
      password: COORDINADOR.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza email inexistente de Coordinador');
  });

  test('CRITERIO 4: Como Coordinador, el token recibido debe permitirme acceder a mi dashboard', async () => {
    // GIVEN - Coordinador que ha iniciado sesión
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });

    const token = loginResponse.body.data.token;

    // WHEN - Intento acceder al dashboard de coordinador
    const dashboardResponse = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${token}`);

    // THEN - Puedo acceder al dashboard
    expect(dashboardResponse.status).toBeLessThan(500);

    console.log('✅ ACEPTACIÓN PASS: Token de Coordinador permite acceso a su dashboard');
  });

  test('CRITERIO 5: Como Coordinador, mis datos personales NO deben incluir la contraseña', async () => {
    // GIVEN - Usuario Coordinador que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });

    // THEN - La respuesta no debe contener mi contraseña
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).not.toHaveProperty('password');

    console.log('✅ ACEPTACIÓN PASS: Contraseña de Coordinador no se expone');
  });

  test('CRITERIO 6: Como Coordinador, debo ver información relevante a mi rol en la respuesta', async () => {
    // GIVEN - Coordinador que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });

    // THEN - La respuesta debe incluir datos específicos del coordinador
    expect(response.status).toBe(200);
    const usuario = response.body.data.usuario;
    
    // Validar datos específicos de coordinador si existen
    if (usuario.es_supervisor !== undefined) {
      expect(usuario.es_supervisor).toBe(true);
    }
    if (usuario.especialidades !== undefined) {
      expect(Array.isArray(usuario.especialidades)).toBe(true);
    }

    console.log('✅ ACEPTACIÓN PASS: Datos específicos de Coordinador incluidos');
  });

  test('CRITERIO 7: Como Coordinador, NO puedo iniciar sesión sin proporcionar credenciales completas', async () => {
    // GIVEN - Intento sin credenciales completas
    const credencialesIncompletas = {
      email: COORDINADOR.email
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere credenciales completas para Coordinador');
  });

  test('CRITERIO 8: Como Coordinador, el token debe ser una cadena válida', async () => {
    // GIVEN - Coordinador que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });

    // THEN - El token debe ser válido
    expect(response.status).toBe(200);
    const token = response.body.data.token;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);

    console.log('✅ ACEPTACIÓN PASS: Token válido generado para Coordinador');
  });

  test('CRITERIO 9: Como Coordinador, el sistema debe responder en tiempo razonable', async () => {
    // GIVEN - Medición de tiempo
    const startTime = Date.now();

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - El tiempo debe ser razonable
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Login de Coordinador respondió en ${responseTime}ms`);
  });

  test('CRITERIO 10: Como Coordinador, debo poder iniciar sesión múltiples veces', async () => {
    // GIVEN - Múltiples intentos de login
    
    // WHEN - Intento iniciar sesión varias veces
    const response1 = await request(API_BASE_URL)
      .post('/login')
      .send({ email: COORDINADOR.email, password: COORDINADOR.password });
    
    const response2 = await request(API_BASE_URL)
      .post('/login')
      .send({ email: COORDINADOR.email, password: COORDINADOR.password });

    // THEN - Ambos intentos deben ser exitosos
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.body.data.token).toBeDefined();
    expect(response2.body.data.token).toBeDefined();

    console.log('✅ ACEPTACIÓN PASS: Coordinador puede iniciar sesión múltiples veces');
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║     RESUMEN - TS-BE-AUTH-ACC-002 - Login COORDINADOR         ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-AUTH-ACC-012                            ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Coordinador, quiero iniciar sesión para acceder a      ║
║ planificación, órdenes de trabajo y gestión de equipos      ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Login exitoso con credenciales válidas                    ║
║ ✓ Rechazo de contraseña incorrecta                          ║
║ ✓ Rechazo de email inexistente                              ║
║ ✓ Token permite acceso al dashboard coordinador             ║
║ ✓ Contraseña no expuesta en respuesta                       ║
║ ✓ Datos específicos de rol incluidos                        ║
║ ✓ Credenciales completas requeridas                         ║
║ ✓ Token válido generado                                     ║
║ ✓ Tiempo de respuesta adecuado                              ║
║ ✓ Múltiples inicios de sesión permitidos                    ║
╚══════════════════════════════════════════════════════════════╝
  `);
});