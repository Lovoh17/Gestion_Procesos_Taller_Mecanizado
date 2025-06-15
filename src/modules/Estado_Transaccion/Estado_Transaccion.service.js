import { Estado_Transaccion } from "./Estado_Transaccion.js";

class EstadoTransaccionService{
    async getAll() {
            try {
                const estado_transaccion = await Estado_Transaccion.findAll();
                return estado_transaccion;
            } catch (error) {
                throw new Error("Error al obtener los estado transacion: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const estado_transaccion = await Estado_Transaccion.findByPk(id);
                if (!estado_transaccion) {
                    throw new Error("estado transaccion no encontrado");
                }
                return estado_transaccion;
            } catch (error) {
                throw new Error("Error al obtener lo estado transaccion: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevoEstadoT = await Estado_Transaccion.create(data);
                return nuevoEstadoT;
            } catch (error) {
                throw new Error("Error al crear lo estado transaccion: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const estado_transaccion = await Estado_Transaccion.findByPk(id);
                if (!estado_transaccion) {
                    throw new Error("Estado transaccion no encontrado");
                }
                await estado_transaccion.update(data);
                return estado_transaccion;
            } catch (error) {
                throw new Error("Error al actualizar el estado transaccion: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const estado_transaccion = await Estado_Transaccion.findByPk(id);
                if (!estado_transaccion) {
                    throw new Error("estado transaccion no encontrado");
                }
                await estado_transaccion.destroy();
                return { message: "estado transaccion eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar el estado transaccion: " + error.message);
            }
        }
    
}
export const estadoTransaccionService = new EstadoTransaccionService();