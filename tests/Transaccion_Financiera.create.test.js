// tests/Transaccion_Financiera.create.test.js
import { transaccionFinancieraService } from '../src/modules/Transaccion_Financiera/Transaccion_Financiera.service.js';
import { sequelize } from '../src/shared/database/database.js';

// Resetear secuencia antes de todos los tests
beforeAll(async () => {
  await sequelize.query(`
    SELECT setval('transacciones_financieras_id_seq', 
      COALESCE((SELECT MAX(id) FROM transacciones_financieras), 0) + 1, 
      false
    );
  `);
});

// Cerrar conexión después de todos los tests
afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-TRANSACCION-UN-001 - Crear Transacción Financiera', () => {
  
  test('debe crear una transacción financiera exitosamente', async () => {
    const transaccionData = {
      codigo: `TRX-TEST-${Date.now()}`,
      tipo_transaccion_id: 1,
      departamento_id: 1,
      fecha_transaccion: new Date('2024-01-15T10:00:00Z'),
      fecha_creacion: new Date('2024-01-15T09:00:00Z'),
      monto_total: 1500.75,
      descripcion: 'Pago de servicios académicos - TEST',
      estado_transaccion_id: 1,
      metodo_pago_id: 1,
      referencia_pago: 'REF-TEST-001',
      creado_por: 1,
      notas: 'Transacción de prueba'
    };

    const resultado = await transaccionFinancieraService.create(transaccionData);

    expect(Number(resultado.id)).toBeGreaterThan(0);
    expect(resultado.codigo).toBe(transaccionData.codigo);
    expect(parseFloat(resultado.monto_total)).toBe(transaccionData.monto_total);
    expect(resultado.descripcion).toBe(transaccionData.descripcion);
  });

  test('debe rechazar transacción sin campos requeridos', async () => {
    const transaccionIncompleta = {
      descripcion: 'Transacción incompleta',
      monto_total: 1000.50
    };

    await expect(transaccionFinancieraService.create(transaccionIncompleta))
      .rejects
      .toThrow();
  });

  test('debe recuperar transacción creada', async () => {
    const transaccionData = {
      codigo: `TRX-PERSIST-${Date.now()}`,
      tipo_transaccion_id: 1,
      departamento_id: 1,
      fecha_transaccion: new Date(),
      fecha_creacion: new Date(),
      monto_total: 2000.50,
      descripcion: 'Test de persistencia',
      estado_transaccion_id: 1,
      metodo_pago_id: 1,
      referencia_pago: 'REF-PERSIST',
      creado_por: 1,
      notas: 'Test'
    };

    const creada = await transaccionFinancieraService.create(transaccionData);
    const recuperada = await transaccionFinancieraService.getById(creada.id);

    expect(Number(recuperada.id)).toBe(Number(creada.id));
    expect(recuperada.codigo).toBe(transaccionData.codigo);
  });
});