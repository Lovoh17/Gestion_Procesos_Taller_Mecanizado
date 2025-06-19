import { Tipos_Transaccion } from "./Tipos_Transaccion.js";

class TipoTransaccionService{
    async getAll() {
            try {
                const tiposTransaccion = await Tipos_Transaccion.findAll();
                return tiposTransaccion;
            } catch (error) {
                throw new Error("Error al obtener los tipos transaccion: " + error.message);
            }
        }
    
        async getById(id) {
            try {
                const TipoTransaccion = await Tipos_Transaccion.findByPk(id);
                if (!TipoTransaccion) {
                    throw new Error("Tipos de transaccion no encontrado");
                }
                return TipoTransaccion;
            } catch (error) {
                throw new Error("Error al obtener el tipo de transaccion: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevaTipoTransaccion = await Tipos_Transaccion.create(data);
                return nuevaTipoTransaccion;
            } catch (error) {
                throw new Error("Error al crear lo tipo de transaccion: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const TipoTransaccion = await Tipos_Transaccion.findByPk(id);
                if (!TipoTransaccion) {
                    throw new Error("Tipo de transaccion no encontrado");
                }
                await TipoTransaccion.update(data);
                return TipoTransaccion;
            } catch (error) {
                throw new Error("Error al actualizar el tipo de transaccion: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const TipoTransaccion = await Tipos_Transaccion.findByPk(id);
                if (!TipoTransaccion) {
                    throw new Error("Tipo de transaccion no encontrado");
                }
                await TipoTransaccion.destroy();
                return { message: "Tipo de transaccion eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar el tipo de transaccion: " + error.message);
            }
        }
    
}

export const tipoTransaccionService = new TipoTransaccionService();