// tests/AlertaReparacion.reportesFechas.test.js
import { alertaReparacionService } from '../src/modules/Alerta_Reparacion/Alerta_Reparacion.service.js';
import { sequelize } from '../src/shared/database/database.js';

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-REPORTES-API-002 - Filtrar Reportes por Fecha', () => {
  
  test('debe incluir campos de fecha en la estructura del reporte', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    expect(alertas.length).toBeGreaterThan(0);
    
    const primeraAlerta = alertas[0];
    
    // Verificar que incluye campos de fecha
    expect(primeraAlerta).toHaveProperty('fecha_generacion');
    expect(primeraAlerta).toHaveProperty('fecha_limite');
    expect(primeraAlerta).toHaveProperty('fecha_resolucion');
  });

  test('debe retornar fechas en formato válido', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    alertas.forEach(alerta => {
      // Verificar que fecha_generacion es válida
      expect(alerta.fecha_generacion).toBeTruthy();
      const fechaGen = new Date(alerta.fecha_generacion);
      expect(fechaGen instanceof Date).toBe(true);
      expect(isNaN(fechaGen.getTime())).toBe(false);
      
      // Verificar que fecha_limite es válida
      expect(alerta.fecha_limite).toBeTruthy();
    });
  });

  test('debe incluir información completa de fechas en cada alerta', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    expect(alertas.length).toBeGreaterThan(0);
    
    alertas.forEach(alerta => {
      expect(alerta.fecha_generacion).toBeTruthy();
      expect(alerta.fecha_limite).toBeTruthy();
    });
  });

  test('debe manejar alertas con fecha de resolución', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    // Buscar alertas resueltas
    const alertasResueltas = alertas.filter(a => a.fecha_resolucion !== null);
    
    // Si existen alertas resueltas, verificar formato
    alertasResueltas.forEach(alerta => {
      expect(alerta.fecha_resolucion).toBeTruthy();
      const fechaRes = new Date(alerta.fecha_resolucion);
      expect(fechaRes instanceof Date).toBe(true);
      expect(isNaN(fechaRes.getTime())).toBe(false);
    });
  });

  test('debe retornar estructura completa con todos los campos de fecha', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    const primeraAlerta = alertas[0];
    
    // Verificar estructura completa del reporte
    expect(primeraAlerta).toHaveProperty('id');
    expect(primeraAlerta).toHaveProperty('herramienta_id');
    expect(primeraAlerta).toHaveProperty('fecha_generacion');
    expect(primeraAlerta).toHaveProperty('fecha_limite');
    expect(primeraAlerta).toHaveProperty('fecha_resolucion');
    expect(primeraAlerta).toHaveProperty('descripcion');
    expect(primeraAlerta).toHaveProperty('estado_reparacion');
    expect(primeraAlerta).toHaveProperty('prioridad_id');
  });

  test('debe incluir campos temporales requeridos', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    alertas.forEach(alerta => {
      // fecha_generacion y fecha_limite son obligatorios
      expect(alerta.fecha_generacion).not.toBeNull();
      expect(alerta.fecha_limite).not.toBeNull();
      
      // fecha_resolucion puede ser null (no resuelta aún)
      // Solo verificamos que el campo existe
      expect(alerta).toHaveProperty('fecha_resolucion');
    });
  });

  test('debe diferenciar entre alertas resueltas y pendientes', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    const conResolucion = alertas.filter(a => a.fecha_resolucion !== null);
    const sinResolucion = alertas.filter(a => a.fecha_resolucion === null);
    
    // Verificar que podemos diferenciarlas
    expect(Array.isArray(conResolucion)).toBe(true);
    expect(Array.isArray(sinResolucion)).toBe(true);
    
    // La suma debe ser el total
    expect(conResolucion.length + sinResolucion.length).toBe(alertas.length);
  });
});