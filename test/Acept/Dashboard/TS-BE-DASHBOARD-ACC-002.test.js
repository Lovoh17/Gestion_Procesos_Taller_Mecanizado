// test/Acept/TS-BE-DASHBOARD-ACC-002.test.js
// Código: TS-BE-DASHBOARD-ACC-002
// Tipo: Test de Aceptación (E2E)
// Responsable: LINO
// Descripción: Pruebas de aceptación del Dashboard de Administrador
// Historia de Usuario: Como Administrador, quiero ver un dashboard con información general del sistema

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES ADMIN =====
const ADMIN = {
  email: 'jefeTaller@taller.com',
  password: 'jefe123'
};

describe('TS-BE-DASHBOARD-ACC-002 - Test de Aceptación: Dashboard Admin', () => {

  let adminToken;

  // Obtener token antes de todas las pruebas
  beforeAll(async () => {
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: ADMIN.email,
        password: ADMIN.password
      });
    
    if (loginResponse.body.data && loginResponse.body.data.token) {
      adminToken = loginResponse.body.data.token;
    }
  });

  test('CRITERIO 1: Como Administrador, quiero acceder al dashboard para ver información general del sistema', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Accept', 'application/json');

    // THEN - El sistema me muestra el dashboard
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');

    console.log('✅ ACEPTACIÓN PASS: Admin puede acceder al dashboard');
    console.log('📊 Estructura del dashboard:', Object.keys(response.body));
  });

  test('CRITERIO 2: Como Administrador, el dashboard debe retornar datos en formato JSON', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - La respuesta debe ser JSON
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);

    console.log('✅ ACEPTACIÓN PASS: Dashboard retorna formato JSON');
  });

  test('CRITERIO 3: Como Administrador, el dashboard debe contener información relevante', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - El dashboard debe tener datos
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);

    console.log('✅ ACEPTACIÓN PASS: Dashboard contiene información');
    console.log(`   Total de propiedades: ${Object.keys(response.body).length}`);
  });

  test('CRITERIO 4: Como Administrador, el dashboard debe responder en tiempo razonable', async () => {
    // GIVEN - Administrador autenticado
    const startTime = Date.now();

    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - El tiempo debe ser menor a 3 segundos
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Dashboard respondió en ${responseTime}ms`);
  });

  test('CRITERIO 5: Como Administrador, los valores numéricos del dashboard deben ser válidos', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Los valores numéricos deben ser válidos
    expect(response.status).toBe(200);
    
    let numericFields = 0;
    Object.keys(response.body).forEach(key => {
      const value = response.body[key];
      if (typeof value === 'number') {
        expect(value).toBeGreaterThanOrEqual(0);
        numericFields++;
      }
    });

    console.log(`✅ ACEPTACIÓN PASS: ${numericFields} campos numéricos validados`);
  });

  test('CRITERIO 6: Como Administrador, puedo acceder al dashboard múltiples veces', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo múltiples veces
    const response1 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);
    
    const response2 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Ambas solicitudes deben ser exitosas
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);

    console.log('✅ ACEPTACIÓN PASS: Múltiples accesos al dashboard exitosos');
  });

  test('CRITERIO 7: Como Administrador, el dashboard debe tener estructura consistente', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo dos veces al dashboard
    const response1 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);
    
    const response2 = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - La estructura debe ser consistente
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    
    const keys1 = Object.keys(response1.body).sort();
    const keys2 = Object.keys(response2.body).sort();
    
    expect(keys1).toEqual(keys2);

    console.log('✅ ACEPTACIÓN PASS: Estructura del dashboard es consistente');
  });

  test('CRITERIO 8: Como Administrador, NO debo poder acceder al dashboard sin autenticación', async () => {
    // GIVEN - Sin token de autenticación
    
    // WHEN - Intento acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // THEN - El sistema debe rechazar el acceso
    expect(response.status).toBeGreaterThanOrEqual(400);

    console.log('✅ ACEPTACIÓN PASS: Dashboard requiere autenticación');
  });

  test('CRITERIO 9: Como Administrador, NO debo poder acceder con token inválido', async () => {
    // GIVEN - Token inválido
    const tokenInvalido = 'token-invalido-xyz123';

    // WHEN - Intento acceder con token inválido
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${tokenInvalido}`);

    // THEN - El sistema debe rechazar el acceso
    expect(response.status).toBeGreaterThanOrEqual(400);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza token inválido');
  });

  test('CRITERIO 10: Como Administrador, el dashboard debe incluir información estadística del sistema', async () => {
    // GIVEN - Administrador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    // THEN - Debe incluir datos del sistema
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    
    // Verificar que tiene algún tipo de información (números, arrays, objetos)
    const hasData = Object.values(response.body).some(value => 
      typeof value === 'number' || 
      Array.isArray(value) || 
      (typeof value === 'object' && value !== null)
    );
    
    expect(hasData).toBe(true);

    console.log('✅ ACEPTACIÓN PASS: Dashboard incluye información estadística');
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║   RESUMEN - TS-BE-DASHBOARD-ACC-002 - Dashboard Admin        ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-DASHBOARD-ACC-002                       ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Administrador, quiero ver un dashboard con             ║
║ información general del sistema para tomar decisiones       ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Acceso al dashboard exitoso                               ║
║ ✓ Formato JSON correcto                                     ║
║ ✓ Información relevante incluida                            ║
║ ✓ Tiempo de respuesta adecuado                              ║
║ ✓ Valores numéricos válidos                                 ║
║ ✓ Múltiples accesos permitidos                              ║
║ ✓ Estructura consistente                                    ║
║ ✓ Autenticación requerida                                   ║
║ ✓ Rechazo de token inválido                                 ║
║ ✓ Información estadística incluida                          ║
╚══════════════════════════════════════════════════════════════╝
  `);
});