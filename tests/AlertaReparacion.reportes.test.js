// tests/AlertaReparacion.reportes.test.js
import { alertaReparacionService } from '../src/modules/Alerta_Reparacion/Alerta_Reparacion.service.js';
import { sequelize } from '../src/shared/database/database.js';

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-REPORTES-API-001 - Generar Reporte de Actividades', () => {
  
  test('debe generar reporte de actividades exitosamente', async () => {
    const alertas = await alertaReparacionService.getAll();

    expect(Array.isArray(alertas)).toBe(true);
    expect(alertas.length).toBeGreaterThan(0);
  });

  test('debe retornar estructura completa en el reporte', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    const primeraAlerta = alertas[0];
    
    // Verificar campos del reporte
    expect(primeraAlerta).toHaveProperty('id');
    expect(primeraAlerta).toHaveProperty('herramienta_id');
    expect(primeraAlerta).toHaveProperty('tipo_alerta_id');
    expect(primeraAlerta).toHaveProperty('fecha_generacion');
    expect(primeraAlerta).toHaveProperty('fecha_limite');
    expect(primeraAlerta).toHaveProperty('prioridad_id');
    expect(primeraAlerta).toHaveProperty('estado_reparacion');
    expect(primeraAlerta).toHaveProperty('descripcion');
  });

  test('debe retornar datos válidos en cada alerta del reporte', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    alertas.forEach(alerta => {
      // Verificar que los campos tienen valores válidos
      expect(Number(alerta.id)).toBeGreaterThan(0);
      expect(Number(alerta.herramienta_id)).toBeGreaterThan(0);
      expect(Number(alerta.tipo_alerta_id)).toBeGreaterThan(0);
      expect(alerta.descripcion).toBeTruthy();
      expect(alerta.descripcion.length).toBeGreaterThan(0);
    });
  });

  test('debe incluir información de fechas en el reporte', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    const primeraAlerta = alertas[0];
    
    // Verificar que las fechas existen
    expect(primeraAlerta.fecha_generacion).toBeTruthy();
    expect(primeraAlerta.fecha_limite).toBeTruthy();
  });

  test('debe incluir información de estado y prioridad', async () => {
    const alertas = await alertaReparacionService.getAll();
    
    alertas.forEach(alerta => {
      expect(alerta).toHaveProperty('prioridad_id');
      expect(alerta).toHaveProperty('estado_reparacion');
      expect(Number(alerta.prioridad_id)).toBeGreaterThan(0);
      expect(Number(alerta.estado_reparacion)).toBeGreaterThan(0);
    });
  });
});