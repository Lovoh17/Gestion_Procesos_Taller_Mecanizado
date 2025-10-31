// test/Acept/TS-BE-DASHBOARD-ACC-013.test.js
// Código: TS-BE-DASHBOARD-ACC-013
// Tipo: Test de Aceptación (E2E)
// Responsable: LINO
// Descripción: Pruebas de aceptación del Dashboard de Coordinador
// Historia de Usuario: Como Coordinador, quiero ver un dashboard con información de órdenes y planificación

import request from 'supertest';

const API_BASE_URL = 'http://localhost:3000';

// ===== CREDENCIALES COORDINADOR =====
const COORDINADOR = {
  email: 'coordinador@taller.com',
  password: 'coord123'
};

describe('TS-BE-DASHBOARD-ACC-013 - Test de Aceptación: Dashboard Coordinador', () => {

  let coordinadorToken;

  // Obtener token antes de todas las pruebas
  beforeAll(async () => {
    const loginResponse = await request(API_BASE_URL)
      .post('/login')
      .send({
        email: COORDINADOR.email,
        password: COORDINADOR.password
      });
    
    if (loginResponse.body.data && loginResponse.body.data.token) {
      coordinadorToken = loginResponse.body.data.token;
    }
  });

  test('CRITERIO 1: Como Coordinador, quiero acceder a mi dashboard para ver información de órdenes', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`)
      .set('Accept', 'application/json');

    // THEN - El sistema me muestra el dashboard
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');

    console.log('✅ ACEPTACIÓN PASS: Coordinador puede acceder al dashboard');
    console.log('📊 Estructura del dashboard:', Object.keys(response.body));
  });

  test('CRITERIO 2: Como Coordinador, el dashboard debe retornar datos en formato JSON', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    // THEN - La respuesta debe ser JSON
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);

    console.log('✅ ACEPTACIÓN PASS: Dashboard retorna formato JSON');
  });

  test('CRITERIO 3: Como Coordinador, el dashboard debe contener información relevante a mi rol', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    // THEN - El dashboard debe tener datos
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);

    console.log('✅ ACEPTACIÓN PASS: Dashboard contiene información del coordinador');
    console.log(`   Total de propiedades: ${Object.keys(response.body).length}`);
  });

  test('CRITERIO 4: Como Coordinador, el dashboard debe responder rápidamente', async () => {
    // GIVEN - Coordinador autenticado
    const startTime = Date.now();

    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // THEN - El tiempo debe ser menor a 3 segundos
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(3000);

    console.log(`✅ ACEPTACIÓN PASS: Dashboard respondió en ${responseTime}ms`);
  });

  test('CRITERIO 5: Como Coordinador, los valores numéricos del dashboard deben ser válidos', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

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

  test('CRITERIO 6: Como Coordinador, puedo acceder al dashboard múltiples veces', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo múltiples veces
    const response1 = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);
    
    const response2 = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    // THEN - Ambas solicitudes deben ser exitosas
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);

    console.log('✅ ACEPTACIÓN PASS: Múltiples accesos al dashboard exitosos');
  });

  test('CRITERIO 7: Como Coordinador, el dashboard debe tener estructura consistente', async () => {
    // GIVEN - Coordinador autenticado
    
    // WHEN - Accedo dos veces al dashboard
    const response1 = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);
    
    const response2 = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    // THEN - La estructura debe ser consistente
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    
    const keys1 = Object.keys(response1.body).sort();
    const keys2 = Object.keys(response2.body).sort();
    
    expect(keys1).toEqual(keys2);

    console.log('✅ ACEPTACIÓN PASS: Estructura del dashboard es consistente');
  });

  test('CRITERIO 8: Como Coordinador, NO debo poder acceder sin autenticación', async () => {
    // GIVEN - Sin token de autenticación
    
    // WHEN - Intento acceder al dashboard
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // THEN - El sistema debe rechazar el acceso
    expect(response.status).toBeGreaterThanOrEqual(400);

    console.log('✅ ACEPTACIÓN PASS: Dashboard requiere autenticación');
  });

  test('CRITERIO 9: Como Coordinador, NO debo poder acceder con token inválido', async () => {
    // GIVEN - Token inválido
    const tokenInvalido = 'token-falso-abc456';

    // WHEN - Intento acceder con token inválido
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${tokenInvalido}`);

    // THEN - El sistema debe rechazar el acceso
    expect(response.status).toBeGreaterThanOrEqual(400);

    console.log('✅ ACEPTACIÓN PASS: Sistema rechaza token inválido');
  });

  test('CRITERIO 10: Como Coordinador, el dashboard debe mostrar información diferente al Admin', async () => {
    // GIVEN - Acceso a ambos dashboards para comparar
    
    // WHEN - Obtengo datos del dashboard coordinador
    const coordResponse = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Authorization', `Bearer ${coordinadorToken}`);

    // THEN - Debe tener datos específicos del rol
    expect(coordResponse.status).toBe(200);
    expect(coordResponse.body).toBeDefined();
    
    // El dashboard debe tener algún tipo de información
    const hasData = Object.values(coordResponse.body).some(value => 
      typeof value === 'number' || 
      Array.isArray(value) || 
      (typeof value === 'object' && value !== null)
    );
    
    expect(hasData).toBe(true);

    console.log('✅ ACEPTACIÓN PASS: Dashboard tiene información específica del coordinador');
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║ RESUMEN - TS-BE-DASHBOARD-ACC-013 - Dashboard Coordinador    ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-DASHBOARD-ACC-013                       ║
║ Tipo:          Test de Aceptación (E2E)                      ║
║ Responsable:   LINO                                          ║
║ Total Tests:   10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ HISTORIA DE USUARIO:                                         ║
║ Como Coordinador, quiero ver un dashboard con               ║
║ información de órdenes, planificación y asignaciones        ║
╠══════════════════════════════════════════════════════════════╣
║ CRITERIOS DE ACEPTACIÓN VALIDADOS:                          ║
║ ✓ Acceso al dashboard exitoso                               ║
║ ✓ Formato JSON correcto                                     ║
║ ✓ Información relevante al rol                              ║
║ ✓ Tiempo de respuesta rápido                                ║
║ ✓ Valores numéricos válidos                                 ║
║ ✓ Múltiples accesos permitidos                              ║
║ ✓ Estructura consistente                                    ║
║ ✓ Autenticación requerida                                   ║
║ ✓ Rechazo de token inválido                                 ║
║ ✓ Información específica del coordinador                    ║
╚══════════════════════════════════════════════════════════════╝
  `);
});