import { RazonPausaPedido } from "./Razon_Pausa_Pedido.js";

class RazonPausaPedidoService{
    async getAll() {
            try {
                const razones_pausa_pedido = await RazonPausaPedido.findAll();
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al obtener las razones para pausa el pedido: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const razones_pausa_pedido = await RazonPausaPedido.findByPk(id);
                if (!razones_pausa_pedido) {
                    throw new Error("Razones pausa pedido no encontrada");
                }
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al obtener la razones pausa pedido: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const razones_pausa_pedido = await RazonPausaPedido.create(data);
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al crear la razones pausa pedido: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const razones_pausa_pedido = await RazonPausaPedido.findByPk(id);
                if (!razones_pausa_pedido) {
                    throw new Error("Razones pausa pedido no encontrada");
                }
                await razones_pausa_pedido.update(data);
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al actualizar la razones pausa pedido: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const razones_pausa_pedido = await RazonPausaPedido.findByPk(id);
                if (!razones_pausa_pedido) {
                    throw new Error("Razones pausa pedido no encontrada");
                }
                await razones_pausa_pedido.destroy();
                return { message: "Razones pausa pedido eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar la razones pausa pedido: " + error.message);
            }
        }
    
}
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.service.js
export const razonPausaPedidoService = new RazonPausaPedidoService();
=======
export const razonesPausaPedidoService = new RazonesPausaPedidoService();
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.service.js
