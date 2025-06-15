import { MetodoPago } from "./Metodo_Pago.js";

class MetodoPagoService{
    async getAll() {
            try {
                const metodoPago = await MetodoPago.findAll();
                return metodoPago;
            } catch (error) {
                throw new Error("Error al obtener los metodos de pago: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const metodoPago = await MetodoPago.findByPk(id);
                if (!metodoPago) {
                    throw new Error("Metodo de pago no encontrada");
                }
                return metodoPago;
            } catch (error) {
                throw new Error("Error al obtener el metodo de pago: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevametodoPago = await MetodoPago.create(data);
                return nuevametodoPago;
            } catch (error) {
                throw new Error("Error al crear el metodo de pago: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const metodoPago = await MetodoPago.findByPk(id);
                if (!metodoPago) {
                    throw new Error("metodo de pago no encontrada");
                }
                await metodoPago.update(data);
                return metodoPago;
            } catch (error) {
                throw new Error("Error al actualizar el metodo de pago: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const metodoPago = await MetodoPago.findByPk(id);
                if (!metodoPago) {
                    throw new Error("Metodo de Pago no encontrada");
                }
                await metodoPago.destroy();
                return { message: "Metodo de Pago eliminada" };
            } catch (error) {
                throw new Error("Error al eliminar el metodo de Pago: " + error.message);
            }
        }
    
}

export const metodoPagoService = new MetodoPagoService();