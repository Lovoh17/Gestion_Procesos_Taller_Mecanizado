import { Tipo_Transaccion } from "./Tipo_Transaccion.js";

class TipoTransaccionService{
    async getAll() {
            try {
                const tiposTransaccion = await Tipo_Transaccion.findAll();
                return tiposTransaccion;
            } catch (error) {
                throw new Error("Error al obtener los tipos transaccion: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const tipoTransaccion = await Tipo_Transaccion.findByPk(id);
                if (!tipoTransaccion) {
                    throw new Error("Tipos de transaccion no encontrado");
                }
                return tipoTransaccion;
            } catch (error) {
                throw new Error("Error al obtener el tipo de transaccion: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevaTipoTransaccion = await Tipo_Transaccion.create(data);
                return nuevaTipoTransaccion;
            } catch (error) {
                throw new Error("Error al crear lo tipo de transaccion: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const tipoTransaccion = await Tipo_Transaccion.findByPk(id);
                if (!tipoTransaccion) {
                    throw new Error("Tipo de transaccion no encontrado");
                }
                await tipoTransaccion.update(data);
                return tipoTransaccion;
            } catch (error) {
                throw new Error("Error al actualizar el tipo de transaccion: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const tipoTransaccion = await Tipo_Transaccion.findByPk(id);
                if (!tipoTransaccion) {
                    throw new Error("Tipo de transaccion no encontrado");
                }
                await tipoTransaccion.destroy();
                return { message: "Tipo de transaccion eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar el tipo de transaccion: " + error.message);
            }
        }
    
}

export const tipoTransaccionService = new TipoTransaccionService();