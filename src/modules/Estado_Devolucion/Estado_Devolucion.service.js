import { Estado_Devolucion } from "./Estado_Devolucion.js";

class EstadoDevolucionService{
    async getAll(){
        try {
            const estados_devolucion = await Estado_Devolucion.findAll();
            return estados_devolucion;
        } catch (error) {
            throw new Error("Error al obtener lo estados devoluciones: " + error.message);
            
        }
    }
    async getById(id){
        try {
            const estados_devolucion = await Estado_Devolucion.findByPk(id);
            if (!estados_devolucion) {
                throw new Error("EL id ingresado no pertenece a un estado devolucion");
                
            }
            return estados_devolucion
        } catch (error) {
            throw new Error("Error al obtener por id los estados devolucion: " + error.message);
            
        }
    }
    async create(data){
        try {
            const nuevoEstadoDevolucion = await Estado_Devolucion.create(data);
            return nuevoEstadoDevolucion;
        } catch (error) {
            throw new Error("Error al Crear estado de devolucion: "+error.message);
            
        }
    }
    async update(id, data){
        try {
            const estados_devolucion = await Estado_Devolucion.findByPk(id);
            if (!estados_devolucion) {
                throw new Error("el estado devolucion selecciona inexistente");
                
            }
            await estados_devolucion.update(data);
            return estados_devolucion;
        } catch (error) {
            throw new Error("Error al actualizar estado devolucion: "+ error.message);
            
        }
    }
    async delete(id){
        try {
            const estados_devolucion = await Estado_Devolucion.findByPk(id);
            if (!estados_devolucion) {
                throw new Error("estado devolucion seleccionado inexistente");
            }
            await estados_devolucion.destroy();
            return {message: "Estado de devolucion " + id+ " eliminado correctamente"};
        } catch (error) {
            throw new Error("Error al eliminar el estado devolucion seleccionado");
        }
    }
}

export const estadoDevolucionService = new EstadoDevolucionService();