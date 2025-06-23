import { TipoAlerta } from "./Tipo_Alerta.js";

class TipoAlertaService{
    async getAll(){
        try {
            const tipoAlerta = await TipoAlerta.findAll();
            return tipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener todas los tipos de alertas: "+ error.message);
        }
    }
    async getById(id){
        try {
            const tipoAlerta = await TipoAlerta.findByPk(id);
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
            const nuevoTipoAlerta = await TipoAlerta.create(data);
            return nuevoTipoAlerta;
        } catch (error) {
            throw new Error("Error al crear un nuevo tipo de alerta: " + error.message);
        }
    }
    async update(id, data){
        try {
            const TipoAlerta = await TipoAlerta.findByPk(id);
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
            const TipoAlerta = await TipoAlerta.findByPk(id);
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
            const TipoAlerta = await TipoAlerta.findOne({where: {nombre}});
            if (!TipoAlerta) {
                throw new Error("Tipo Alerta inexistente");
                
            }
            return TipoAlerta;
        } catch (error) {
            throw new Error("Error al obtener el tipo alerta por nombre en: "+ error.message);
            
        }
    }
}
<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.service.js
export const tipoAlertaService = new TipoAlertaService();
=======
export const tiposAlertasService = new TiposAlertasService();
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.service.js
