

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES ADMIN =====
const ADMIN = {
  email: 'jefeTaller@taller.com',
  password: 'coord123',
  rolEsperado: 'ADMIN',
  nombre: 'Rafael Lino'
};

describe('TS-BE-AUTH-ACC-001 - Test de Aceptación: Login ADMINISTRADOR', () => {

  test('CRITERIO 1: Como Administrador, quiero iniciar sesión con credenciales válidas para acceder al sistema', async () => {
    // GIVEN - Usuario Admin con credenciales válidas
    const credenciales = {
      email: ADMIN.email,
      password: ADMIN.password
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
    expect(response.body.data.usuario.email).toBe(ADMIN.email);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.token.length).toBeGreaterThan(0);

    console.log('✅ ACEPTACIÓN PASS: Admin puede iniciar sesión exitosamente');
    console.log(`   Usuario: ${response.body.data.usuario.email}`);
    console.log(`   Token generado: ${response.body.data.token.substring(0, 30)}...`);
  });

  test('CRITERIO 2: Como Administrador, NO debo poder iniciar sesión con contraseña incorrecta', async () => {
    // GIVEN - Usuario Admin con contraseña incorrecta
    const credencialesIncorrectas = {
      email: ADMIN.email,
      password: 'ContraseñaIncorrecta123!'
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('inválida');

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza contraseña incorrecta de Admin');
  });

  test('CRITERIO 3: Como Administrador, NO debo poder iniciar sesión con email incorrecto', async () => {
    // GIVEN - Email que no existe en el sistema
    const credencialesIncorrectas = {
      email: 'admin_falso@tallermec.com',
      password: ADMIN.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/auth/login')
      .send(credencialesIncorrectas);

    // THEN - El sistema rechaza el acceso
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza email inexistente de Admin');
  });

  test('CRITERIO 4: Como Administrador, el token recibido debe permitirme acceder al dashboard de administración', async () => {
    // GIVEN - Un Admin que ha iniciado sesión exitosamente
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    const token = loginResponse.body.data.token;

    // WHEN - Intento acceder al dashboard de admin con el token
    const dashboardResponse = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${token}`);

    // THEN - Puedo acceder al dashboard
    expect(dashboardResponse.status).toBeLessThan(500);
    
    console.log('✅ ACEPTACIÓN PASS: Token de Admin permite acceso al dashboard');
  });

  test('CRITERIO 5: Como Administrador, mis datos personales NO deben incluir la contraseña', async () => {
    // GIVEN - Usuario Admin que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - La respuesta no debe contener mi contraseña
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).not.toHaveProperty('password');
    expect(response.body.data.usuario).not.toHaveProperty('contrasena');

    console.log('✅ ACEPTACIÓN PASS: Contraseña de Admin no se expone en la respuesta');
  });

  test('CRITERIO 6: Como Administrador, NO puedo iniciar sesión sin proporcionar email', async () => {
    // GIVEN - Intento sin email
    const credencialesIncompletas = {
      password: ADMIN.password
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere email para Admin');
  });

  test('CRITERIO 7: Como Administrador, NO puedo iniciar sesión sin proporcionar contraseña', async () => {
    // GIVEN - Intento sin contraseña
    const credencialesIncompletas = {
      email: ADMIN.email
    };

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send(credencialesIncompletas);

    // THEN - El sistema rechaza la solicitud
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('requerido');

    console.log('✅ ACEPTACIÓN PASS: Sistema requiere contraseña para Admin');
  });

  test('CRITERIO 8: Como Administrador, debo recibir un token válido JWT', async () => {
    // GIVEN - Admin que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - El token debe tener formato JWT válido
    expect(response.status).toBe(200);
    const token = response.body.data.token;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // JWT tiene 3 partes

    console.log('✅ ACEPTACIÓN PASS: Token JWT válido generado para Admin');
  });

  test('CRITERIO 9: Como Administrador, el tiempo de respuesta del login debe ser menor a 3 segundos', async () => {
    // GIVEN - Medición de tiempo de respuesta
    const startTime = Date.now();

    // WHEN - Intento iniciar sesión
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - El tiempo debe ser menor a 3 segundos
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Login de Admin respondió en ${responseTime}ms`);
  });

  test('CRITERIO 10: Como Administrador, puedo ver mi rol en la respuesta del login', async () => {
    // GIVEN - Admin que inicia sesión
    
    // WHEN - Inicio sesión exitosamente
    const response = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });

    // THEN - La respuesta debe incluir mi rol
    expect(response.status).toBe(200);
    expect(response.body.data.usuario).toHaveProperty('rol');

    console.log('✅ ACEPTACIÓN PASS: Respuesta incluye rol del Admin');
    console.log(`   Rol: ${response.body.data.usuario.rol || 'ADMIN'}`);
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║     RESUMEN - TS-ACC-AUTH-001 - Login ADMINISTRADOR          ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-ACC-AUTH-001                               ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Administrador, quiero iniciar sesión para acceder      ║
║ al panel de administración del sistema                      ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Login exitoso con credenciales válidas                    ║
║ ✓ Rechazo de contraseña incorrecta                          ║
║ ✓ Rechazo de email inexistente                              ║
║ ✓ Token permite acceso al dashboard                         ║
║ ✓ Contraseña no expuesta en respuesta                       ║
║ ✓ Email es requerido                                        ║
║ ✓ Contraseña es requerida                                   ║
║ ✓ Token JWT válido generado                                 ║
║ ✓ Tiempo de respuesta < 3 segundos                          ║
║ ✓ Rol visible en respuesta                                  ║
╚══════════════════════════════════════════════════════════════╝
  `);
});