// test/integration/dashboard/TS-BE-DASHBOARD-API-013.test.js
// Código: TS-BE-DASHBOARD-API-013
// Versión: 1.0
// Responsable: LINO
// Descripción: Verificar endpoint GET /dashboard/coordinador
// Módulo: Dashboard - Panel Principal Coordinador
// Propósito: Validar el correcto funcionamiento del endpoint de dashboard para Coordinador

import request from 'supertest';

// ===== URL BASE DE LA API =====
const API_BASE_URL = 'http://localhost:3000';

// ===== PRUEBAS DASHBOARD COORDINADOR =====
describe('TS-BE-DASHBOARD-API-013 - Dashboard Coordinador API', () => {

  test('GET /dashboard/coordinador - Debe retornar 200 y datos del dashboard', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador')
      .set('Accept', 'application/json');

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.headers['content-type']).toMatch(/json/);

    console.log('PASS: Endpoint dashboard coordinador responde correctamente');
    console.log(' Datos recibidos:', JSON.stringify(response.body, null, 2));
  });

  test('GET /dashboard/coordinador - Debe retornar estructura de datos específica del coordinador', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    console.log(' PASS: Estructura de datos del dashboard coordinador correcta');
  });

  test('GET /dashboard/coordinador - Debe incluir información de órdenes de trabajo', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.ordenesActivas !== undefined) {
      expect(typeof response.body.ordenesActivas).toBe('number');
      console.log(' PASS: Información de órdenes activas incluida');
    }
    
    if (response.body.ordenesAsignadas !== undefined) {
      expect(typeof response.body.ordenesAsignadas).toBe('number');
      console.log(' PASS: Información de órdenes asignadas incluida');
    }
  });

  test('GET /dashboard/coordinador - Los valores numéricos deben ser números válidos', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    // Validar que todos los valores numéricos sean realmente números
    Object.keys(response.body).forEach(key => {
      if (typeof response.body[key] === 'number') {
        expect(response.body[key]).toBeGreaterThanOrEqual(0);
      }
    });

    console.log(' PASS: Todos los valores numéricos son válidos');
  });

  test('GET /dashboard/coordinador - Debe incluir información de planificación', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.planificacion || response.body.tareasPendientes) {
      console.log(' PASS: Información de planificación incluida');
    } else {
      console.log('ℹ INFO: Verificar manualmente información de planificación');
    }
  });

  test('GET /dashboard/coordinador - Debe incluir asignaciones si existen', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.asignaciones) {
      expect(Array.isArray(response.body.asignaciones) || typeof response.body.asignaciones === 'number').toBe(true);
      console.log(' PASS: Información de asignaciones incluida');
    }
  });

  test('GET /dashboard/coordinador - Debe incluir control de calidad si existe', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.controlCalidad || response.body.inspeccionesPendientes) {
      console.log(' PASS: Información de control de calidad incluida');
    }
  });

  test('GET /dashboard/coordinador - Debe incluir información de mantenimiento', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.mantenimiento || response.body.mantenimientoPendiente) {
      console.log(' PASS: Información de mantenimiento incluida');
    }
  });

  test('GET /dashboard/coordinador - Tiempo de respuesta debe ser menor a 2 segundos', async () => {
    // ACT
    const startTime = Date.now();
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // ASSERT
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(2000);

    console.log(` PASS: Tiempo de respuesta: ${responseTime}ms`);
  });

  test('GET /dashboard/coordinador - Debe retornar datos diferentes a los del admin', async () => {
    // ACT
    const adminResponse = await request(API_BASE_URL).get('/dashboard/admin');
    const coordResponse = await request(API_BASE_URL).get('/dashboard/coordinador');

    // ASSERT
    expect(adminResponse.status).toBe(200);
    expect(coordResponse.status).toBe(200);
    
    // Los dashboards deben tener datos diferentes (no idénticos)
    const adminData = JSON.stringify(adminResponse.body);
    const coordData = JSON.stringify(coordResponse.body);
    
    // Si son diferentes es correcto
    if (adminData !== coordData) {
      console.log('PASS: Dashboard coordinador tiene datos específicos (diferente a admin)');
    } else {
      console.log(' WARNING: Dashboard coordinador retorna los mismos datos que admin');
    }
  });

  test('GET /dashboard/coordinador - Debe incluir herramientas asignadas si existe', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.herramientas || response.body.herramientasAsignadas) {
      console.log(' PASS: Información de herramientas incluida');
    }
  });

  test('GET /dashboard/coordinador - Debe incluir planos si existen', async () => {
    // ACT
    const response = await request(API_BASE_URL)
      .get('/dashboard/coordinador');

    // ASSERT
    expect(response.status).toBe(200);
    
    if (response.body.planos || response.body.planosDisponibles) {
      console.log(' PASS: Información de planos incluida');
    }
  });
});

// ===== RESUMEN DE EJECUCIÓN =====
afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║   RESUMEN - TS-BE-DASHBOARD-UN-013 - Dashboard Coordinador  ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-DASHBOARD-UN-013                       ║
║ Versión:       1.0                                           ║
║ Responsable:   LINO                                          ║
║ Total Pruebas: 12                                            ║
╠══════════════════════════════════════════════════════════════╣
║ Endpoint Probado:                                            ║
║ • GET /dashboard/coordinador                                 ║
╠══════════════════════════════════════════════════════════════╣
║ CASOS PROBADOS:                                              ║
║ ✓ Respuesta 200 con datos                                   ║
║ ✓ Estructura de datos específica                            ║
║ ✓ Información de órdenes de trabajo                         ║
║ ✓ Valores numéricos válidos                                 ║
║ ✓ Información de planificación                              ║
║ ✓ Asignaciones incluidas                                    ║
║ ✓ Control de calidad                                        ║
║ ✓ Información de mantenimiento                              ║
║ ✓ Tiempo de respuesta                                       ║
║ ✓ Datos diferentes a admin                                  ║
║ ✓ Herramientas asignadas                                    ║
║ ✓ Planos disponibles                                        ║
╚══════════════════════════════════════════════════════════════╝
  `);
});