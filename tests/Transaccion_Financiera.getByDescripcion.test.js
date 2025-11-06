// tests/Transaccion_Financiera.getByDescripcion.test.js
import { transaccionFinancieraService } from '../src/modules/Transaccion_Financiera/Transaccion_Financiera.service.js';
import { sequelize } from '../src/shared/database/database.js';

beforeAll(async () => {
  // Crear transacciones de prueba con descripciones conocidas
  const transaccionesTest = [
    {
      codigo: `TRX-DESC-1-${Date.now()}`,
      tipo_transaccion_id: 1,
      departamento_id: 1,
      fecha_transaccion: new Date(),
      fecha_creacion: new Date(),
      monto_total: 1500.00,
      descripcion: 'Pago de servicios académicos',
      estado_transaccion_id: 1,
      metodo_pago_id: 1,
      referencia_pago: 'REF-DESC-001',
      creado_por: 1,
      notas: 'Test búsqueda'
    },
    {
      codigo: `TRX-DESC-2-${Date.now()}`,
      tipo_transaccion_id: 1,
      departamento_id: 1,
      fecha_transaccion: new Date(),
      fecha_creacion: new Date(),
      monto_total: 2000.00,
      descripcion: 'Compra de material educativo',
      estado_transaccion_id: 1,
      metodo_pago_id: 1,
      referencia_pago: 'REF-DESC-002',
      creado_por: 1,
      notas: 'Test búsqueda'
    },
    {
      codigo: `TRX-DESC-3-${Date.now()}`,
      tipo_transaccion_id: 1,
      departamento_id: 1,
      fecha_transaccion: new Date(),
      fecha_creacion: new Date(),
      monto_total: 3000.00,
      descripcion: 'Mantenimiento de equipos ACADÉMICOS',
      estado_transaccion_id: 1,
      metodo_pago_id: 1,
      referencia_pago: 'REF-DESC-003',
      creado_por: 1,
      notas: 'Test búsqueda'
    }
  ];

  for (const transaccion of transaccionesTest) {
    await transaccionFinancieraService.create(transaccion);
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-TRANSACCIONES-API-003 - Buscar Transacciones por Descripción', () => {
  
  test('debe buscar transacciones por descripción exitosamente', async () => {
    const resultado = await transaccionFinancieraService.getByDescripcion('académicos');

    // Verificar que retorna un array
    expect(Array.isArray(resultado)).toBe(true);
    
    // Verificar que encontró transacciones
    expect(resultado.length).toBeGreaterThan(0);
    
    // Verificar que todas contienen el término de búsqueda
    resultado.forEach(transaccion => {
      expect(transaccion.descripcion.toLowerCase()).toContain('académicos');
    });
  });

  test('debe realizar búsqueda case-insensitive', async () => {
    // Buscar con diferentes casos
    const resultadoMinusculas = await transaccionFinancieraService.getByDescripcion('académicos');
    const resultadoMayusculas = await transaccionFinancieraService.getByDescripcion('ACADÉMICOS');
    const resultadoMixto = await transaccionFinancieraService.getByDescripcion('AcAdÉmIcOs');

    // Todos deberían encontrar las mismas transacciones
    expect(resultadoMinusculas.length).toBeGreaterThan(0);
    expect(resultadoMayusculas.length).toBe(resultadoMinusculas.length);
    expect(resultadoMixto.length).toBe(resultadoMinusculas.length);
  });

  test('debe retornar estructura correcta en resultados', async () => {
    const resultado = await transaccionFinancieraService.getByDescripcion('académicos');
    
    const primeraTransaccion = resultado[0];
    
    // Verificar campos obligatorios
    expect(primeraTransaccion).toHaveProperty('id');
    expect(primeraTransaccion).toHaveProperty('codigo');
    expect(primeraTransaccion).toHaveProperty('monto_total');
    expect(primeraTransaccion).toHaveProperty('descripcion');
  });

  test('debe lanzar error cuando no encuentra transacciones', async () => {
    await expect(
      transaccionFinancieraService.getByDescripcion('TEXTO_QUE_NO_EXISTE_12345')
    ).rejects.toThrow('No se encontraron transacciones');
  });
});