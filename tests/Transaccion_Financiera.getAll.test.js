// tests/Transaccion_Financiera.getAll.test.js
import { transaccionFinancieraService } from '../src/modules/Transaccion_Financiera/Transaccion_Financiera.service.js';
import { sequelize } from '../src/shared/database/database.js';

beforeAll(async () => {
  await sequelize.query(`
    SELECT setval('transacciones_financieras_id_seq', 
      COALESCE((SELECT MAX(id) FROM transacciones_financieras), 0) + 1, 
      false
    );
  `);
});

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-TRANSACCIONES-API-002 - Listar Transacciones Financieras', () => {
  
  test('debe obtener todas las transacciones exitosamente', async () => {
    const transacciones = await transaccionFinancieraService.getAll();

    // Verificar que retorna un array
    expect(Array.isArray(transacciones)).toBe(true);
    
    // Verificar que hay datos
    expect(transacciones.length).toBeGreaterThan(0);
    
    // Verificar estructura de cada transacción
    transacciones.forEach(transaccion => {
      expect(transaccion).toHaveProperty('id');
      expect(transaccion).toHaveProperty('codigo');
      expect(transaccion).toHaveProperty('monto_total');
      expect(transaccion).toHaveProperty('descripcion');
      expect(transaccion).toHaveProperty('tipo_transaccion_id');
      expect(transaccion).toHaveProperty('estado_transaccion_id');
    });
  });

  test('debe retornar transacciones con campos válidos', async () => {
    const transacciones = await transaccionFinancieraService.getAll();
    
    const primeraTransaccion = transacciones[0];
    
    // Verificar tipos de datos
    expect(typeof primeraTransaccion.codigo).toBe('string');
    expect(primeraTransaccion.codigo.length).toBeGreaterThan(0);
    expect(primeraTransaccion.descripcion.length).toBeGreaterThan(0);
    expect(parseFloat(primeraTransaccion.monto_total)).toBeGreaterThan(0);
  });
});