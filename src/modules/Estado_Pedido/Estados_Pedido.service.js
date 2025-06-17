import { Estado_Pedido } from "./Estado_Pedido.js";

class EstadoPedidoService{
    async getAll() {
            try {
                const estados_pedido = await Estado_Pedido.findAll();
                return estados_pedido;
            } catch (error) {
                throw new Error("Error al obtener los estados de los pedidos: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const estados_pedido = await Estado_Pedido.findByPk(id);
                if (!estados_pedido) {
                    throw new Error("Estado pedido no encontrada");
                }
                return estados_pedido;
            } catch (error) {
                throw new Error("Error al obtener el estado pedido: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevoestadopedido = await Estado_Pedido.create(data);
                return nuevoestadopedido;
            } catch (error) {
                throw new Error("Error al crear el estado pedido: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const estadopedido = await Estado_Pedido.findByPk(id);
                if (!estadopedido) {
                    throw new Error("Estado pedido no encontrado");
                }
                await estadopedido.update(data);
                return estadopedido;
            } catch (error) {
                throw new Error("Error al actualizar estado pedido: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const estadopedido = await Estado_Pedido.findByPk(id);
                if (!estadopedido) {
                    throw new Error("estado pedido no encontrada");
                }
                await estadopedido.destroy();
                return { message: "Estado pedido eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar estado pedido: " + error.message);
            }
        }
    
}

export const estadoPedidoService = new EstadoPedidoService();