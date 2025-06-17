import { Tipo_Alerta } from "./Tipo_Alerta.js";

class TipoAlertaService{
    async getAll(){
        try {
            const tipoAlerta = await Tipo_Alerta.findAll();
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener todas los tipos de alertas: "+ error.message);
        }
    }
    async getById(id){
        try {
            const tipoAlerta = await Tipo_Alerta.findByPk(id);
            if (!tipoAlerta) {
                throw new Error("Tipo de alerta no encontrada");
            }
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener el tipo de alerta por id: " + error.message);
        }
    }
    async create(data){
        try {
            const nuevoTipoAlerta = await Tipo_Alerta.create(data);
            return nuevoTipoAlerta;
        } catch (error) {
            throw new Error("Error al crear un nuevo tipo de alerta: " + error.message);
        }
    }
    async update(id, data){
        try {
            const tipoAlerta = await Tipo_Alerta.findByPk(id);
            if (!tipoAlerta) {
                throw new Error("Tipo alerta inexistente");
                
            }
            await tipoAlerta.update(data);
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al actualizar: "+ error.message);
            
        }
    }
    async delete(id){
        try {
            const tipoAlerta = await Tipo_Alerta.findByPk(id);
            if (!tipoAlerta) {
                throw new Error("Tipo alerta inexistente");
                
            }
            await tipoAlerta.destroy();
            return {message: "Se elimino el tipo alerta " + id};
        } catch (error) {
            throw new Error("Error al eliminar el tipo alerta "+ id+ " "+error.message);
            
        }
    }
    async getByName(nombre){
        try {
            const tipoAlerta = await Tipo_Alerta.findOne({ where: { nombre } });
            if (!tipoAlerta) {
                throw new Error("Tipo alerta no encontrada");
            }
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener el tipo alerta por nombre: " + error.message);
        }
    }
    
}
export const tipoAlertaService = new TipoAlertaService();