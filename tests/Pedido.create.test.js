// tests/Pedido.create.test.js
import { pedidoService } from '../src/modules/Pedido/Pedido.service.js';
import { sequelize } from '../src/shared/database/database.js';

beforeAll(async () => {
  await sequelize.query(`
    SELECT setval('pedidos_id_seq', 
      COALESCE((SELECT MAX(id) FROM pedidos), 0) + 1, 
      false
    );
  `);
});

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-ORDENES-API-001 - Crear Nueva Orden', () => {
  
  test('debe crear una orden exitosamente', async () => {
    const pedidoData = {
      codigo_pedido: `PED-TEST-${Date.now()}`,
      tipo_pedido_id: 1,
      plano_id: 1,
      solicitante_id: 1,
      fecha_solicitud: new Date('2024-01-15T10:00:00Z'),
      fecha_requerida: '2024-02-01',
      estado_id: 1,
      prioridad: 1,
      precio_final: 2000.00,
      proyecto_asociado: 'Proyecto Alpha Testing',
      costo_estimado: 1500.00,
      notas: 'Orden de prueba para validación del sistema TS-BE-ORDENES-API-001'
    };

    const resultado = await pedidoService.create(pedidoData);

    // Verificar que se creó correctamente
    expect(Number(resultado.id)).toBeGreaterThan(0);
    expect(resultado.codigo_pedido).toBe(pedidoData.codigo_pedido);
    expect(Number(resultado.tipo_pedido_id)).toBe(pedidoData.tipo_pedido_id);
    expect(Number(resultado.plano_id)).toBe(pedidoData.plano_id);
    expect(Number(resultado.solicitante_id)).toBe(pedidoData.solicitante_id);
    expect(Number(resultado.estado_id)).toBe(pedidoData.estado_id);
    expect(Number(resultado.prioridad)).toBe(pedidoData.prioridad);
    expect(parseFloat(resultado.precio_final)).toBe(pedidoData.precio_final);
  });

  test('debe aplicar valores por defecto correctamente', async () => {
    const pedidoData = {
      codigo_pedido: `PED-DEFAULT-${Date.now()}`,
      tipo_pedido_id: 1,
      plano_id: 1,
      solicitante_id: 1,
      fecha_solicitud: new Date(),
      fecha_requerida: '2024-03-01',
      estado_id: 1,
      precio_final: 1000.00
    };

    const resultado = await pedidoService.create(pedidoData);

    // Verificar valores por defecto
    expect(Number(resultado.contador_pausas)).toBe(0);
    expect(Number(resultado.tiempo_total_pausado)).toBe(0);
    expect(Number(resultado.prioridad)).toBe(3); // Valor por defecto
  });

  test('debe validar campos obligatorios', async () => {
    const pedidoIncompleto = {
      codigo_pedido: `PED-INCOMPLETE-${Date.now()}`,
      tipo_pedido_id: 1
      // Faltan campos requeridos
    };

    await expect(pedidoService.create(pedidoIncompleto))
      .rejects
      .toThrow();
  });

  test('debe validar código de pedido único', async () => {
    const codigoUnico = `PED-UNIQUE-${Date.now()}`;
    
    const pedidoData = {
      codigo_pedido: codigoUnico,
      tipo_pedido_id: 1,
      plano_id: 1,
      solicitante_id: 1,
      fecha_solicitud: new Date(),
      fecha_requerida: '2024-03-01',
      estado_id: 1,
      precio_final: 1500.00
    };

    // Crear primer pedido
    const primerPedido = await pedidoService.create(pedidoData);
    expect(Number(primerPedido.id)).toBeGreaterThan(0);

    // Intentar crear segundo con mismo código
    await expect(pedidoService.create(pedidoData))
      .rejects
      .toThrow();
  });

  test('debe retornar estructura completa del pedido', async () => {
    const pedidoData = {
      codigo_pedido: `PED-STRUCT-${Date.now()}`,
      tipo_pedido_id: 1,
      plano_id: 1,
      solicitante_id: 1,
      fecha_solicitud: new Date(),
      fecha_requerida: '2024-03-01',
      estado_id: 1,
      precio_final: 1800.00,
      notas: 'Test de estructura'
    };

    const resultado = await pedidoService.create(pedidoData);

    // Verificar campos obligatorios
    expect(resultado).toHaveProperty('id');
    expect(resultado).toHaveProperty('codigo_pedido');
    expect(resultado).toHaveProperty('tipo_pedido_id');
    expect(resultado).toHaveProperty('plano_id');
    expect(resultado).toHaveProperty('solicitante_id');
    expect(resultado).toHaveProperty('fecha_solicitud');
    expect(resultado).toHaveProperty('fecha_requerida');
    expect(resultado).toHaveProperty('estado_id');
    expect(resultado).toHaveProperty('precio_final');
    expect(resultado).toHaveProperty('contador_pausas');
    expect(resultado).toHaveProperty('tiempo_total_pausado');
  });
});