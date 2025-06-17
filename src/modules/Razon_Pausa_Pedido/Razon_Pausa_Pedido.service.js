import { Razon_Pausa_Pedido } from "./Razon_Pausa_Pedido.js";

class RazonPausaPedidoService{
    async getAll() {
            try {
                const razones_pausa_pedido = await Razon_Pausa_Pedido.findAll();
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al obtener las razones para pausa el pedido: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const razones_pausa_pedido = await Razon_Pausa_Pedido.findByPk(id);
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
                const razones_pausa_pedido = await Razon_Pausa_Pedido.create(data);
                return razones_pausa_pedido;
            } catch (error) {
                throw new Error("Error al crear la razones pausa pedido: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const razones_pausa_pedido = await Razon_Pausa_Pedido.findByPk(id);
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
                const razones_pausa_pedido = await Razon_Pausa_Pedido.findByPk(id);
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
export const razonPausaPedidoService = new RazonPausaPedidoService();