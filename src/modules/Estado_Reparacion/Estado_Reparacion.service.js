import { Estado_Reparacion } from "./Estado_Reparacion.js";

class EstadoReparacionService{
    async getAll(){
        try {
            const estadoReparacion = await Estado_Reparacion.findAll();
            return estadoReparacion;
        } catch (error) {
            throw new Error("Error al obtener todos los Estado Reparacion: " + error.message);
            
        }
    }
    async getById(id){
        try {
            const estadoReparacion = await Estado_Reparacion.findByPk(id);
            if(!estadoReparacion){
                throw new Error("Estado reparacion no encontrado (el id no es correcto)")
            }
            return estadoReparacion;
        } catch (error) {
            throw new Error("Error al obtener el estado de reparacion: " + error.message)
        }
    }
    async create(data){
        try {
            const nuevoEstadoReparacion = await Estado_Reparacion.create(data);
            return nuevoEstadoReparacion;
        } catch (error) {
            throw new Error("Error al crear el estado reparacion "+ error.message);
            
        }
    }
    async update(id, data){
        try {
            const estadoReparacion = await Estado_Reparacion.findByPk(id);
            if (!estadoReparacion) {
                throw new Error("Estado de reparacion no encontrado");
            }
            await estadoReparacion.update(data);
            return estadoReparacion;
        } catch (error) {
            throw new Error("Error al actualizar el estado de reparacion: " + error.message);
        }
    }
    async delete(id){
        try {
            const estadoReparacion = await Estado_Reparacion.findByPk(id);
            if (!estadoReparacion) {
                throw new Error("Estado reparacion no encontrado");               
            }
            await estadoReparacion.destroy();
            return {message: "Estado Reparacion eliminada"};
        } catch (error) {
            throw new Error("Error al eliminar el estado reparacion");
            
        }
    }
    
}

export const estadoReparacionService = new EstadoReparacionService();