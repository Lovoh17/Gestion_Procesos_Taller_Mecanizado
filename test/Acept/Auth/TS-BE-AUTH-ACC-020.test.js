// test/acceptance/auth/TS-ACC-AUTH-003.test.js
// Código: TS-ACC-AUTH-003
// Tipo: Test de Aceptación (E2E)
// Responsable: LINO
// Descripción: Pruebas de aceptación de login para rol OPERARIO
// Historia de Usuario: Como Operario, quiero iniciar sesión para ver mis trabajos asignados y reportar avances

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES OPERARIO =====
const OPERARIO = {
  email: 'operario@taller.com',
  password: 'oper123',
  rolEsperado: 'OPERARIO',
  nombre: 'José Operario'
};

describe('TS-ACC-AUTH-003 - Test de Aceptación: Login OPERARIO', () => {

  test('CRITERIO 1: Como Operario, quiero iniciar sesión con credenciales válidas para ver mis trabajos', async () => {
    // GIVEN - Usuario Operario con credenciales válidas
    const credenciales = {
      email: OPERARIO.email,
      password: OPERARIO.password
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
    expect(response.body.data.usuario.email).toBe(OPERARIO.email);

    console.log('✅ ACEPTACIÓN PASS: Operario puede iniciar sesión exitosamente');
    console.log(`   Usuario: ${response.body.data.usuario.email}`);
  });

  test('CRITERIO 2: Como Operario, NO debo poder iniciar sesión con contraseña incorrecta', async () => {
    // GIVEN - Operario con contraseña incorrecta
    const credencialesIncorrectas = {
      email: OPERARIO.email,
      password: 'passwordIncorrecto'
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza contraseña incorrecta de Operario');
  });

  test('CRITERIO 3: Como Operario, NO debo poder iniciar sesión sin email', async () => {
    // GIVEN - Intento sin email
    const credencialesIncompletas = {
      password: OPERARIO.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere email para Operario');
  });

  test('CRITERIO 4: Como Operario, NO debo poder iniciar sesión sin contraseña', async () => {
    // GIVEN - Intento sin contraseña
    const credencialesIncompletas = {
      email: OPERARIO.email
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere contraseña para Operario');
  });

  test('CRITERIO 5: Como Operario, debo recibir un token válido para acceder a mis trabajos', async () => {
    // GIVEN - Operario que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: OPERARIO.email,
        password: OPERARIO.password
      });

    // THEN - Debo recibir un token válido
    expect(response.status).toBe(200);
    const token = response.body.data.token;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);

    console.log('✅ ACEPTACIÓN PASS: Token válido generado para Operario');
  });

  test('CRITERIO 6: Como Operario, mis datos personales NO deben incluir la contraseña', async () => {
    // GIVEN - Operario que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: OPERARIO.email,
        password: OPERARIO.password
      });

    // THEN - La contraseña no debe estar en la respuesta
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).not.toHaveProperty('password');

    console.log('✅ ACEPTACIÓN PASS: Contraseña de Operario no se expone');
  });

  test('CRITERIO 7: Como Operario, debo recibir confirmación de inicio de sesión exitoso', async () => {
    // GIVEN - Operario con credenciales válidas
    
    // WHEN - Inicio sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: OPERARIO.email,
        password: OPERARIO.password
      });

    // THEN - Debo recibir mensaje de éxito
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();

    console.log('✅ ACEPTACIÓN PASS: Mensaje de confirmación recibido para Operario');
  });

  test('CRITERIO 8: Como Operario, el sistema debe responder rápidamente al login', async () => {
    // GIVEN - Medición de tiempo
    const startTime = Date.now();

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: OPERARIO.email,
        password: OPERARIO.password
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - Tiempo debe ser menor a 3 segundos
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Login de Operario respondió en ${responseTime}ms`);
  });

  test('CRITERIO 9: Como Operario, debo ver mi rol en la información retornada', async () => {
    // GIVEN - Operario que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: OPERARIO.email,
        password: OPERARIO.password
      });

    // THEN - Mi rol debe estar en la respuesta
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).toHaveProperty('rol');

    console.log('✅ ACEPTACIÓN PASS: Rol de Operario visible en respuesta');
  });

  test('CRITERIO 10: Como Operario, NO debo tener acceso con credenciales de otro usuario', async () => {
    // GIVEN - Credenciales de otro usuario
    const credencialesOtroUsuario = {
      email: 'admin@tallermec.com',
      password: 'oper123' // Password de operario con email de admin
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesOtroUsuario);

    // THEN - El sistema debe rechazar
    expect(response.status).toBe(401);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza credenciales mezcladas');
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       RESUMEN - TS-ACC-AUTH-003 - Login OPERARIO             ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-ACC-AUTH-003                               ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Operario, quiero iniciar sesión para ver mis           ║
║ trabajos asignados y reportar el avance de mis tareas       ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Login exitoso con credenciales válidas                    ║
║ ✓ Rechazo de contraseña incorrecta                          ║
║ ✓ Email es requerido                                        ║
║ ✓ Contraseña es requerida                                   ║
║ ✓ Token válido generado                                     ║
║ ✓ Contraseña no expuesta                                    ║
║ ✓ Mensaje de confirmación recibido                          ║
║ ✓ Tiempo de respuesta adecuado                              ║
║ ✓ Rol visible en respuesta                                  ║
║ ✓ Credenciales propias requeridas                           ║
╚══════════════════════════════════════════════════════════════╝
  `);
});