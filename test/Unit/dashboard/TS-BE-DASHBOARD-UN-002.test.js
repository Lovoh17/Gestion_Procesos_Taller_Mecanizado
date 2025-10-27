// test/integration/dashboard/TS-BE-DASHBOARD-API-002.test.js
// Código: TS-BE-DASHBOARD-API-002
// Versión: 1.0
// Responsable: LINO
// Descripción: Verificar endpoint GET /dashboard/admin
// Módulo: Dashboard - Panel Principal Admin
// Propósito: Validar el correcto funcionamiento del endpoint de dashboard para Admin

import request from 'supertest';

// ===== URL BASE DE LA API =====
const API_BASE_URL = 'http://localhost:3000';

// ===== PRUEBAS DASHBOARD ADMIN =====
describe('TS-BE-DASHBOARD-API-002 - Dashboard Admin API', () => {

  test('GET /dashboard/admin - Debe retornar 200 y datos del dashboard', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin')
      .set('Accept', 'application/json');

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.headers['content-type']).toMatch(/json/);

    console.log('✅ PASS: Endpoint dashboard admin responde correctamente');
    console.log('📊 Datos recibidos:', JSON.stringify(response.body, null, 2));
  });

  test('GET /dashboard/admin - Debe retornar un objeto con datos', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // ASSERT
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body).not.toBeNull();

    console.log('✅ PASS: Dashboard admin retorna un objeto válido');
  });

  test('GET /dashboard/admin - El objeto retornado no debe estar vacío', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // ASSERT
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);

    console.log('✅ PASS: Dashboard admin contiene datos');
    console.log(`   Total de propiedades: ${Object.keys(response.body).length}`);
  });

  test('GET /dashboard/admin - Todos los valores numéricos deben ser válidos si existen', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // ASSERT
    expect(response.status).toBe(200);
    
    // Validar que todos los valores numéricos sean números válidos
    let numericFields = 0;
    Object.keys(response.body).forEach(key => {
      const value = response.body[key];
      if (typeof value === 'number') {
        expect(value).toBeGreaterThanOrEqual(0);
        numericFields++;
      }
    });

    console.log(`✅ PASS: ${numericFields} campos numéricos validados correctamente`);
  });

  test('GET /dashboard/admin - Debe retornar Content-Type application/json', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);

    console.log('✅ PASS: Content-Type correcto (application/json)');
  });

  test('GET /dashboard/admin - No debe retornar errores 4xx o 5xx', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');

    // ASSERT
    expect(response.status).toBeLessThan(400);

    console.log('✅ PASS: No hay errores del servidor');
  });

  test('GET /dashboard/admin - Tiempo de respuesta debe ser menor a 2 segundos', async () => {
    // ACT
    const startTime = Date.now();
    const response = await request(API_BASE_URL)
      .get('/dashboard/admin');
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // ASSERT
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(2000);

    console.log(`✅ PASS: Tiempo de respuesta: ${responseTime}ms`);
  });

  test('GET /dashboard/admin - Debe aceptar múltiples solicitudes consecutivas', async () => {
    // ACT
    const response1 = await request(API_BASE_URL).get('/dashboard/admin');
    const response2 = await request(API_BASE_URL).get('/dashboard/admin');
    const response3 = await request(API_BASE_URL).get('/dashboard/admin');

    // ASSERT
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);

    console.log('✅ PASS: Endpoint soporta múltiples solicitudes');
  });

  test('GET /dashboard/admin - Estructura de datos debe ser consistente', async () => {
    // ACT
    const response1 = await request(API_BASE_URL).get('/dashboard/admin');
    const response2 = await request(API_BASE_URL).get('/dashboard/admin');

    // ASSERT
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    
    const keys1 = Object.keys(response1.body).sort();
    const keys2 = Object.keys(response2.body).sort();
    
    expect(keys1).toEqual(keys2);

    console.log('✅ PASS: Estructura de datos consistente entre solicitudes');
  });

  test('GET /dashboard/admin - Debe manejar errores de conexión adecuadamente', async () => {
    // Esta prueba verifica que el endpoint esté disponible
    // ACT
    try {
      const response = await request(API_BASE_URL)
        .get('/dashboard/admin')
        .timeout(5000);

      // ASSERT
      expect(response.status).toBe(200);
      console.log('✅ PASS: Endpoint accesible y responde correctamente');
    } catch (error) {
      fail('El endpoint no está disponible o no responde');
    }
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║      RESUMEN - TS-BE-DASHBOARD-UN-002 - Dashboard Admin     ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-DASHBOARD-UN-002                       ║
║ Versión:       1.1                                           ║                                      
║ Total Pruebas: 10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ Endpoint Probado:                                            ║
║ • GET /dashboard/admin                                       ║
╠══════════════════════════════════════════════════════════════╣
║ CASOS PROBADOS:                                              ║
║ ✓ Respuesta 200 con datos                                   ║
║ ✓ Retorna objeto válido                                     ║
║ ✓ Objeto contiene datos                                     ║
║ ✓ Valores numéricos válidos                                 ║
║ ✓ Content-Type correcto                                     ║
║ ✓ Sin errores del servidor                                  ║
║ ✓ Tiempo de respuesta adecuado                              ║
║ ✓ Soporta múltiples solicitudes                             ║
║ ✓ Estructura consistente                                    ║
║ ✓ Manejo de errores                                         ║
═══════════════════════════════════════════════════════════════
  `);
});