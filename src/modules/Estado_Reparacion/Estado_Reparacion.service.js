import { EstadoReparacion } from "./Estado_Reparacion.js";

class EstadoReparacionService{
    async getAll(){
        try {
            const EstadoReparacion = await EstadoReparacion.findAll();
            return EstadoReparacion;
        } catch (error) {
            throw new Error("Error al obtener todos los Estado Reparacion: " + error.message);
            
        }
    }
    async getById(id){
        try {
            const EstadoReparacion = await EstadoReparacion.findByPk(id);
            if(!EstadoReparacion){
                throw new Error("Estado reparacion no encontrado (el id no es correcto)")
            }
            return EstadoReparacion;
        } catch (error) {
            throw new Error("Error al obtener el estado de reparacion: " + error.message)
        }
    }
    async create(data){
        try {
            const nuevoEstadoReparacion = await EstadoReparacion.create(data);
            return nuevoEstadoReparacion;
        } catch (error) {
            throw new Error("Error al crear el estado reparacion "+ error.message);
            
        }
    }
    async update(id, data){
        try {
            const EstadoReparacion = await EstadoReparacion.findByPk(id);
            if (!EstadoReparacion) {
                throw new Error("Estado de reparacion no encontrado");
            }
            await EstadoReparacion.update(data);
            return EstadoReparacion;
        } catch (error) {
            throw new Error("Error al actualizar el estado de reparacion: " + error.message);
        }
    }
    async delete(id){
        try {
            const EstadoReparacion = await EstadoReparacion.findByPk(id);
            if (!EstadoReparacion) {
                throw new Error("Estado reparacion no encontrado");               
            }
            await EstadoReparacion.destroy();
            return {message: "Estado Reparacion eliminada"};
        } catch (error) {
            throw new Error("Error al eliminar el estado reparacion");
            
        }
    }
    async getByName(nombre){
        try {
            const EstadoReparacion = await EstadoReparacion.findOne({where: {nombre}});
            if (!EstadoReparacion) {
                throw new Error("Estado Reparacion no encontrado");
            }
            return EstadoReparacion;
        } catch (error) {
            throw new Error("Error al obtener el estado reparacion por nombre " + error.message);        
        }
    }
}

export const estadoReparacionService = new EstadoReparacionService();