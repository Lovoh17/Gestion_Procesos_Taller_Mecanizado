// tests/Transaccion_Financiera.update.test.js
import { transaccionFinancieraService } from '../src/modules/Transaccion_Financiera/Transaccion_Financiera.service.js';
import { sequelize } from '../src/shared/database/database.js';

let transaccionCreada;

beforeAll(async () => {
  // Crear una transacción de prueba
  transaccionCreada = await transaccionFinancieraService.create({
    codigo: `TRX-UPDATE-${Date.now()}`,
    tipo_transaccion_id: 1,
    departamento_id: 1,
    fecha_transaccion: new Date('2024-01-15T10:00:00Z'),
    fecha_creacion: new Date('2024-01-15T09:00:00Z'),
    monto_total: 1500.75,
    descripcion: 'Pago de servicios académicos - ORIGINAL',
    estado_transaccion_id: 1,
    metodo_pago_id: 1,
    referencia_pago: 'REF-001-ORIGINAL',
    creado_por: 1,
    notas: 'Transacción de prueba original'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-TRANSACCIONES-API-004 - Actualizar Transacción Financiera', () => {
  
  test('debe actualizar transacción exitosamente', async () => {
    const datosActualizacion = {
      descripcion: 'Pago de servicios académicos - ACTUALIZADO',
      monto_total: 1750.50,
      notas: 'Transacción actualizada para corrección de monto',
      referencia_pago: 'REF-001-ACTUALIZADA'
    };

    const resultado = await transaccionFinancieraService.update(
      transaccionCreada.id,
      datosActualizacion
    );

    // Verificar que los campos actualizados tienen nuevos valores
    expect(resultado.descripcion).toBe(datosActualizacion.descripcion);
    expect(parseFloat(resultado.monto_total)).toBe(datosActualizacion.monto_total);
    expect(resultado.notas).toBe(datosActualizacion.notas);
    expect(resultado.referencia_pago).toBe(datosActualizacion.referencia_pago);
  });

  test('debe mantener campos no modificados', async () => {
    const datosActualizacion = {
      descripcion: 'Solo actualizo descripción'
    };

    const resultado = await transaccionFinancieraService.update(
      transaccionCreada.id,
      datosActualizacion
    );

    // Verificar que campos no enviados mantienen valores originales
    expect(resultado.codigo).toBe(transaccionCreada.codigo);
    expect(Number(resultado.tipo_transaccion_id)).toBe(Number(transaccionCreada.tipo_transaccion_id));
    expect(Number(resultado.estado_transaccion_id)).toBe(Number(transaccionCreada.estado_transaccion_id));
  });

  test('debe retornar estructura correcta después de actualizar', async () => {
    const datosActualizacion = {
      monto_total: 2000.00
    };

    const resultado = await transaccionFinancieraService.update(
      transaccionCreada.id,
      datosActualizacion
    );

    // Verificar estructura completa
    expect(resultado).toHaveProperty('id');
    expect(resultado).toHaveProperty('codigo');
    expect(resultado).toHaveProperty('monto_total');
    expect(resultado).toHaveProperty('descripcion');
    expect(resultado).toHaveProperty('tipo_transaccion_id');
  });

  test('debe lanzar error al actualizar transacción inexistente', async () => {
    const idInexistente = 999999;
    const datosActualizacion = {
      descripcion: 'Intento de actualización'
    };

    await expect(
      transaccionFinancieraService.update(idInexistente, datosActualizacion)
    ).rejects.toThrow('Transacción no encontrada');
  });

  test('debe persistir cambios en base de datos', async () => {
    const datosActualizacion = {
      descripcion: 'Persistencia verificada',
      monto_total: 3000.00
    };

    await transaccionFinancieraService.update(
      transaccionCreada.id,
      datosActualizacion
    );

    // Recuperar de la base de datos y verificar
    const transaccionRecuperada = await transaccionFinancieraService.getById(
      transaccionCreada.id
    );

    expect(transaccionRecuperada.descripcion).toBe(datosActualizacion.descripcion);
    expect(parseFloat(transaccionRecuperada.monto_total)).toBe(datosActualizacion.monto_total);
  });
});