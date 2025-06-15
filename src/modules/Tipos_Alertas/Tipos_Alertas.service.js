import { TiposAlertas } from "./TiposAlertas.js";

class TiposAlertasService{
    async getAll(){
        try {
            const tipoAlerta = await TiposAlertas.findAll();
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener todas los tipos de alertas: "+ error.message);
        }
    }
    async getById(id){
        try {
            const tipoAlerta = await TiposAlertas.findByPk(id);
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
            const nuevoTipoAlerta = await TiposAlertas.create(data);
            return nuevoTipoAlerta;
        } catch (error) {
            throw new Error("Error al crear un nuevo tipo de alerta: " + error.message);
        }
    }
    async update(id, data){
        try {
            const TipoAlerta = await TiposAlertas.findByPk(id);
            if (!TipoAlerta) {
                throw new Error("Tipo alerta inexistente");
                
            }
            await TipoAlerta.update(data);
            return TipoAlerta;
        } catch (error) {
            throw new Error("Error al actualizar: "+ error.message);
            
        }
    }
    async delete(id){
        try {
            const TipoAlerta = await TiposAlertas.findByPk(id);
            if (!TipoAlerta) {
                throw new Error("Tipo alerta inexistente");
                
            }
            await TipoAlerta.destroy();
            return {message: "Se elimino el tipo alerta " + id};
        } catch (error) {
            throw new Error("Error al eliminar el tipo alerta "+ id+ " "+error.message);
            
        }
    }
    //inecesario
    async getByName(nombre){
        try {
            const TipoAlerta = await TiposAlertas.findOne({where: {nombre}});
            if (!TipoAlerta) {
                throw new Error("Tipo Alerta inexistente");
                
            }
            return TipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener el tipo alerta por nombre en: "+ error.message);
            
        }
    }
}
export const tiposAlertasService = new TiposAlertasService();