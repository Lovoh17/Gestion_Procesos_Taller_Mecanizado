// tests/Pedido.updateEstado.test.js
import { pedidoService } from '../src/modules/Pedido/Pedido.service.js';
import { sequelize } from '../src/shared/database/database.js';

let pedidoCreado;

beforeAll(async () => {
  // Crear un pedido de prueba
  pedidoCreado = await pedidoService.create({
    codigo_pedido: `PED-ESTADO-${Date.now()}`,
    tipo_pedido_id: 1,
    plano_id: 1,
    solicitante_id: 1,
    fecha_solicitud: new Date(),
    fecha_requerida: '2024-03-01',
    estado_id: 1,
    prioridad: 2,
    precio_final: 1500.00,
    proyecto_asociado: 'Test Cambio Estado'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-ORDENES-API-003 - Cambiar Estado de Orden', () => {
  
  test('debe cambiar el estado de la orden exitosamente', async () => {
    const nuevoEstado = { estado_id: 2 };

    const resultado = await pedidoService.update(
      pedidoCreado.id,
      nuevoEstado
    );

    // Verificar que el estado cambió
    expect(Number(resultado.estado_id)).toBe(2);
  });

  test('debe mantener campos no modificados al cambiar estado', async () => {
    const estadoOriginal = await pedidoService.getById(pedidoCreado.id);
    
    const nuevoEstado = { estado_id: 3 };
    const resultado = await pedidoService.update(
      pedidoCreado.id,
      nuevoEstado
    );

    // Verificar que solo cambió el estado
    expect(Number(resultado.estado_id)).toBe(3);
    expect(resultado.codigo_pedido).toBe(estadoOriginal.codigo_pedido);
    expect(Number(resultado.tipo_pedido_id)).toBe(Number(estadoOriginal.tipo_pedido_id));
    expect(Number(resultado.prioridad)).toBe(Number(estadoOriginal.prioridad));
    expect(resultado.proyecto_asociado).toBe(estadoOriginal.proyecto_asociado);
  });

  test('debe retornar estructura completa después de cambiar estado', async () => {
    const nuevoEstado = { estado_id: 4 };

    const resultado = await pedidoService.update(
      pedidoCreado.id,
      nuevoEstado
    );

    // Verificar estructura completa
    expect(resultado).toHaveProperty('id');
    expect(resultado).toHaveProperty('codigo_pedido');
    expect(resultado).toHaveProperty('estado_id');
    expect(resultado).toHaveProperty('tipo_pedido_id');
    expect(resultado).toHaveProperty('prioridad');
    expect(resultado).toHaveProperty('precio_final');
  });

  test('debe persistir el cambio de estado en base de datos', async () => {
    const nuevoEstado = { estado_id: 5 };

    await pedidoService.update(pedidoCreado.id, nuevoEstado);

    // Recuperar y verificar
    const pedidoRecuperado = await pedidoService.getById(pedidoCreado.id);
    expect(Number(pedidoRecuperado.estado_id)).toBe(5);
  });

  test('debe fallar al cambiar estado de orden inexistente', async () => {
    const idInexistente = 999999;
    const nuevoEstado = { estado_id: 2 };

    await expect(
      pedidoService.update(idInexistente, nuevoEstado)
    ).rejects.toThrow('Pedido no encontrado');
  });

  test('debe permitir múltiples cambios de estado', async () => {
    // Cambiar varias veces de estado
    await pedidoService.update(pedidoCreado.id, { estado_id: 1 });
    let resultado = await pedidoService.getById(pedidoCreado.id);
    expect(Number(resultado.estado_id)).toBe(1);

    await pedidoService.update(pedidoCreado.id, { estado_id: 2 });
    resultado = await pedidoService.getById(pedidoCreado.id);
    expect(Number(resultado.estado_id)).toBe(2);

    await pedidoService.update(pedidoCreado.id, { estado_id: 3 });
    resultado = await pedidoService.getById(pedidoCreado.id);
    expect(Number(resultado.estado_id)).toBe(3);
  });
});