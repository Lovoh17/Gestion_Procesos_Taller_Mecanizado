// tests/Pedido.getAll.test.js
import { pedidoService } from '../src/modules/Pedido/Pedido.service.js';
import { sequelize } from '../src/shared/database/database.js';

afterAll(async () => {
  await sequelize.close();
});

describe('TS-BE-ORDENES-API-002 - Listar Órdenes', () => {
  
  test('debe listar todas las órdenes exitosamente', async () => {
    const pedidos = await pedidoService.getAll();

    expect(Array.isArray(pedidos)).toBe(true);
    expect(pedidos.length).toBeGreaterThan(0);
  });

  test('debe retornar estructura completa de cada orden', async () => {
    const pedidos = await pedidoService.getAll();
    
    const primerPedido = pedidos[0];
    
    // Verificar campos obligatorios
    expect(primerPedido).toHaveProperty('id');
    expect(primerPedido).toHaveProperty('codigo_pedido');
    expect(primerPedido).toHaveProperty('tipo_pedido_id');
    expect(primerPedido).toHaveProperty('plano_id');
    expect(primerPedido).toHaveProperty('solicitante_id');
    expect(primerPedido).toHaveProperty('fecha_solicitud');
    expect(primerPedido).toHaveProperty('fecha_requerida');
    expect(primerPedido).toHaveProperty('estado_id');
    expect(primerPedido).toHaveProperty('prioridad');
    expect(primerPedido).toHaveProperty('precio_final');
    expect(primerPedido).toHaveProperty('contador_pausas');
    expect(primerPedido).toHaveProperty('tiempo_total_pausado');
  });

  test('debe retornar datos válidos en cada orden', async () => {
    const pedidos = await pedidoService.getAll();
    
    pedidos.forEach(pedido => {
      // Verificar que los campos tienen valores válidos
      expect(pedido.codigo_pedido).toBeTruthy();
      expect(pedido.codigo_pedido.length).toBeGreaterThan(0);
      expect(parseFloat(pedido.precio_final)).toBeGreaterThan(0);
    });
  });
});