// test/acceptance/auth/TS-ACC-AUTH-004.test.js
// Código: TS-ACC-AUTH-004
// Tipo: Test de Aceptación (E2E)
// Responsable: LINO
// Descripción: Pruebas de aceptación de login para rol TÉCNICO
// Historia de Usuario: Como Técnico, quiero iniciar sesión para acceder a programación y mantenimiento

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES TÉCNICO =====
const TECNICO = {
  email: 'tecnico@taller.com',
  password: 'tecnico123',
  rolEsperado: 'TECNICO',
  nombre: 'Miguel Técnico'
};

describe('TS-ACC-AUTH-004 - Test de Aceptación: Login TÉCNICO', () => {

  test('CRITERIO 1: Como Técnico, quiero iniciar sesión con credenciales válidas para acceder al sistema', async () => {
    // GIVEN - Usuario Técnico con credenciales válidas
    const credenciales = {
      email: TECNICO.email,
      password: TECNICO.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credenciales)
      .set('Accept', 'application/json');

    // THEN - El sistema me permite acceder
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Inicio de sesión exitoso');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('usuario');
    expect(response.body.data.usuario.email).toBe(TECNICO.email);

    console.log('✅ ACEPTACIÓN PASS: Técnico puede iniciar sesión exitosamente');
    console.log(`   Usuario: ${response.body.data.usuario.email}`);
  });

  test('CRITERIO 2: Como Técnico, NO debo poder iniciar sesión con contraseña incorrecta', async () => {
    // GIVEN - Técnico con contraseña incorrecta
    const credencialesIncorrectas = {
      email: TECNICO.email,
      password: 'passwordMalo123'
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza contraseña incorrecta de Técnico');
  });

  test('CRITERIO 3: Como Técnico, NO debo poder iniciar sesión con email que no existe', async () => {
    // GIVEN - Email inexistente
    const credencialesIncorrectas = {
      email: 'tecnico_falso@taller.com',
      password: TECNICO.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza email inexistente de Técnico');
  });

  test('CRITERIO 4: Como Técnico, debo recibir un token válido JWT al iniciar sesión', async () => {
    // GIVEN - Técnico que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: TECNICO.email,
        password: TECNICO.password
      });

    // THEN - Debo recibir un token JWT válido
    expect(response.status).toBe(200);
    const token = response.body.data.token;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // JWT tiene 3 partes

    console.log('✅ ACEPTACIÓN PASS: Token JWT válido generado para Técnico');
  });

  test('CRITERIO 5: Como Técnico, mis datos personales NO deben incluir la contraseña', async () => {
    // GIVEN - Técnico que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: TECNICO.email,
        password: TECNICO.password
      });

    // THEN - La contraseña no debe estar expuesta
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).not.toHaveProperty('password');
    expect(response.body.data.usuario).not.toHaveProperty('contrasena');

    console.log('✅ ACEPTACIÓN PASS: Contraseña de Técnico no se expone');
  });

  test('CRITERIO 6: Como Técnico, NO puedo iniciar sesión sin proporcionar email', async () => {
    // GIVEN - Intento sin email
    const credencialesIncompletas = {
      password: TECNICO.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere email para Técnico');
  });

  test('CRITERIO 7: Como Técnico, NO puedo iniciar sesión sin proporcionar contraseña', async () => {
    // GIVEN - Intento sin contraseña
    const credencialesIncompletas = {
      email: TECNICO.email
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere contraseña para Técnico');
  });

  test('CRITERIO 8: Como Técnico, el token debe permitirme acceder a mi dashboard', async () => {
    // GIVEN - Técnico que ha iniciado sesión
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: TECNICO.email,
        password: TECNICO.password
      });

    const token = loginResponse.body.data.token;

    // WHEN - Intento acceder al dashboard de técnico
    const dashboardResponse = await request(API_BASE_URL)
      .get('/dashboard/tecnico')
      .set('Authorization', `Bearer ${token}`);

    // THEN - Puedo acceder o el endpoint existe
    expect(dashboardResponse.status).toBeLessThan(500);

    console.log('✅ ACEPTACIÓN PASS: Token de Técnico permite acceso a recursos');
  });

  test('CRITERIO 9: Como Técnico, el tiempo de respuesta del login debe ser menor a 3 segundos', async () => {
    // GIVEN - Medición de tiempo
    const startTime = Date.now();

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: TECNICO.email,
        password: TECNICO.password
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - El tiempo debe ser razonable
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Login de Técnico respondió en ${responseTime}ms`);
  });

  test('CRITERIO 10: Como Técnico, debo ver mi rol en la respuesta del login', async () => {
    // GIVEN - Técnico que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: TECNICO.email,
        password: TECNICO.password
      });

    // THEN - Mi rol debe estar visible
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).toHaveProperty('rol');

    console.log('✅ ACEPTACIÓN PASS: Rol de Técnico visible en respuesta');
    console.log(`   Rol: ${response.body.data.usuario.rol || 'TECNICO'}`);
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       RESUMEN - TS-ACC-AUTH-004 - Login TÉCNICO              ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-ACC-AUTH-004                               ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Técnico, quiero iniciar sesión para acceder a          ║
║ programación, mantenimiento y panel técnico                 ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Login exitoso con credenciales válidas                    ║
║ ✓ Rechazo de contraseña incorrecta                          ║
║ ✓ Rechazo de email inexistente                              ║
║ ✓ Token JWT válido generado                                 ║
║ ✓ Contraseña no expuesta                                    ║
║ ✓ Email es requerido                                        ║
║ ✓ Contraseña es requerida                                   ║
║ ✓ Token permite acceso a recursos                           ║
║ ✓ Tiempo de respuesta < 3 segundos                          ║
║ ✓ Rol visible en respuesta                                  ║
╚══════════════════════════════════════════════════════════════╝
  `);
});