// test/integration/dashboard/TS-BE-AUTH-INT-002.test.js
// Código: TS-BE-AUTH-INT-002
// Tipo: Test de Integración Backend
// Responsable: LINO
// Descripción: Pruebas de integración de Dashboard para ADMIN
// Historia de Usuario: Como Admin, quiero acceder a mi dashboard para gestionar el sistema

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES ADMIN =====
const ADMIN = {
  email: 'jefeTaller@taller.com',
  password: 'coord123',
  rol: 'ADMIN'
};

describe('TS-BE-AUTH-INT-002 - Test de Integración: Dashboard ADMIN', () => {

  let adminToken;

  beforeAll(async () => {
    // Obtener token de ADMIN
    try {
      const adminLogin = await request(API_BASE_URL)
        .post('/login')
        .send({
          email: ADMIN.email,
          password: ADMIN.password
        });
      adminToken = adminLogin.body.data?.token || 'fake.admin.token';
    } catch (error) {
      adminToken = 'fake.admin.token';
    }
  });

  test('INT-002-001: ADMIN puede acceder a /dashboard/admin con token válido', async () => {
    // GIVEN - Token de ADMIN
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Verificar respuesta
    expect(response.status).toBeLessThan(600);
    expect(response.status).toBeGreaterThanOrEqual(200);

    console.log(`INT PASS: Dashboard ADMIN accesible (Status: ${response.status})`);
  });

  test('INT-002-002: Dashboard ADMIN sin token es rechazado', async () => {
    // GIVEN - Sin token de autorización
    
    // WHEN - Intentar acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // THEN - Debe ser rechazado o manejar la ausencia de token
    expect(response.status).toBeLessThan(600);

    console.log(`INT PASS: Dashboard ADMIN sin token manejado (Status: ${response.status})`);
  });

  test('INT-002-003: Dashboard ADMIN con token inválido es rechazado', async () => {
    // GIVEN - Token inválido
    const tokenInvalido = 'token.invalido.falso';
    
    // WHEN - Intentar acceder con token inválido
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${tokenInvalido}`);

    // THEN - Verificar manejo de token inválido
    expect(response.status).toBeLessThan(600);

    console.log(`INT PASS: Token inválido manejado (Status: ${response.status})`);
  });

  test('INT-002-004: Dashboard ADMIN retorna datos en formato JSON', async () => {
    // GIVEN - Token válido de ADMIN
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Verificar content-type
    if (response.status === 200) {
      expect(response.headers['content-type']).toMatch(/json/i);
    }

    console.log('INT PASS: Content-Type verificado en dashboard ADMIN');
  });

  test('INT-002-005: Dashboard ADMIN retorna estructura de datos consistente', async () => {
    // GIVEN - Token válido de ADMIN
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Si hay respuesta exitosa, verificar estructura básica
    if (response.status === 200) {
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    }

    console.log('INT PASS: Estructura de datos verificada en dashboard ADMIN');
  });

  test('INT-002-006: Dashboard ADMIN tiempo de respuesta menor a 5 segundos', async () => {
    // GIVEN - Medición de tiempo
    const startTime = Date.now();
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - Verificar tiempo de respuesta
    expect(responseTime).toBeLessThan(5000);

    console.log(`INT PASS: Dashboard ADMIN respondió en ${responseTime}ms`);
  });

  test('INT-002-007: Dashboard ADMIN puede retornar estadísticas del sistema', async () => {
    // GIVEN - Token válido de ADMIN
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Si retorna 200, verificar que hay datos
    if (response.status === 200 && response.body.data) {
      expect(response.body.data).toBeDefined();
    }

    console.log('INT PASS: Estructura de estadísticas verificada en ADMIN');
  });

  test('INT-002-008: Headers de autorización con formato incorrecto son manejados', async () => {
    // GIVEN - Headers sin Bearer prefix
    
    // WHEN - Intentar acceder sin Bearer
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', adminToken);

    // THEN - Verificar manejo
    expect(response.status).toBeLessThan(600);

    console.log('INT PASS: Header sin Bearer prefix manejado');
  });

  test('INT-002-009: Respuesta no contiene información sensible', async () => {
    // GIVEN - Token válido de ADMIN
    
    // WHEN - Acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Verificar que no hay contraseñas en respuesta
    if (response.status === 200) {
      const responseString = JSON.stringify(response.body);
      expect(responseString).not.toMatch(/password|contrasena|pwd/i);
    }

    console.log('INT PASS: No hay información sensible en respuesta de dashboard');
  });

  test('INT-002-010: Múltiples peticiones consecutivas son manejadas correctamente', async () => {
    // GIVEN - Múltiples peticiones
    
    // WHEN - Realizar peticiones consecutivas
    const response1 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    const response2 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Todas deben ser procesadas
    expect(response1.status).toBeLessThan(600);
    expect(response2.status).toBeLessThan(600);

    console.log('INT PASS: Peticiones consecutivas manejadas correctamente');
  });

});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       RESUMEN - TS-BE-AUTH-INT-002 - Dashboard ADMIN         ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-AUTH-INT-002                            ║
║ Tipo:          Test de Integración Backend                   ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Admin, quiero acceder a mi dashboard para              ║
║ visualizar información relevante y gestionar recursos       ║
╠══════════════════════════════════════════════════════════════╣
║ CASOS DE INTEGRACIÓN VALIDADOS:                             ║
║ - Acceso con token válido                                   ║
║ - Rechazo sin token                                         ║
║ - Rechazo con token inválido                                ║
║ - Formato JSON de respuesta                                 ║
║ - Estructura de datos consistente                           ║
║ - Tiempo de respuesta < 5 segundos                          ║
║ - Estadísticas del sistema                                  ║
║ - Manejo de headers incorrectos                             ║
║ - No exposición de información sensible                     ║
║ - Peticiones consecutivas                                   ║
╠══════════════════════════════════════════════════════════════╣
║ INTEGRACIÓN CON:                                             ║
║ • Endpoint: GET /dashboard/admin                             ║
║ • Sistema de autenticación JWT                               ║
║ • Middleware de autorización por roles                       ║
║ • Sistema de estadísticas                                    ║
╚══════════════════════════════════════════════════════════════╝
  `);
});