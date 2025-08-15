import { where } from "sequelize";
import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";
import { herramientaService } from "../Herramienta/Herramienta.service.js";
import { CheckoutHerramienta } from "./CheckOutHerramienta.js";

class CheckoutHerramientaService{
    async getAll(){
        try {
            const checkoutHerramienta = await CheckoutHerramienta.findAll({where:{delete:false}});
            return checkoutHerramienta;
        } catch (error) {
            throw new Error("Error al obtener todos lo checks de las herramientas: " + error.message);
        }
    }
    async getAllFOrce(){
        try {
            const checkoutHerramienta = await CheckoutHerramienta.findAll();
            return checkoutHerramienta;
        } catch (error) {
            throw new Error("Error al obtener todos lo checks de las herramientas: " + error.message);
        }
    }
    async getById(id) {
        try {
            const checkOH = await CheckoutHerramienta.findOne({
                where:{
                    id: id,
                    delete:false
                }});
            if (!checkOH) {
                throw new Error("Check no encontrado");
            }
            return checkOH;
        } catch (error) {
            throw new Error("Error al obtener el check de la herramienta: " + error.message);
        }
    }
    async create(data){
        try {
            
            const herramienta = await herramientaService.getById(data.herramienta_id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            const nuevaCOH = await CheckoutHerramienta.create(data);
            const estado_herramienta = await Estado_Herramienta.findOne({
                where: {id: data.herramienta_id}
            });
            const estadoSimplificado = (estado_herramienta.nombre).toLowerCase();
            if (!estadoSimplificado.includes("disponible") ) {
                if (estadoSimplificado.includes("uso")) {
                    throw new Error("La herramienta esta en uso");
                }else if (estadoSimplificado.includes("dañada")) {
                    throw new Error("La herramienta esta dañada");
                }else if (estadoSimplificado.includes("reservado")) {
                    throw new Error("La herramienta esta reservada");
                }else if (estadoSimplificado.includes("mantenimiento")) {
                    throw new Error("La herramienta esta en mantenimiento");
                }
            }
            return nuevaCOH;
        } catch (error) {
            throw new Error("Error al crear el check de la herramienta: " + error.message);
        }
        
    }
    async update (id, data){
        try {
            const checkOH = await CheckoutHerramienta.findByPk(data.herramienta_id);
            if (!checkOH) {
                throw new Error("Check no encontrado");
            }

            const herramienta = await herramientaService.getById(data.herramienta_id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            
            const estado_herramienta = await Estado_Herramienta.findOne({
                where: {id: data.herramienta_id}
            });
            const estadoSimplificado = (estado_herramienta.nombre).toLowerCase();
            if (!estadoSimplificado.includes("disponible") ) {
                if (estadoSimplificado.includes("uso")) {
                    throw new Error("La herramienta esta en uso");
                }else if (estadoSimplificado.includes("dañada")) {
                    throw new Error("La herramienta esta dañada");
                }else if (estadoSimplificado.includes("reservado")) {
                    throw new Error("La herramienta esta reservada");
                }else if (estadoSimplificado.includes("mantenimiento")) {
                    throw new Error("La herramienta esta en mantenimiento");
                }
            }
            await checkOH.update(data);
            return checkOH;
        } catch (error) {
            throw new Error("Error al actualizar el check de la herramienta: " + error.message);    
        }       
    }
    async delete(id){
        try {
            const checkOH = await CheckoutHerramienta.findByPk(id);
            if (!checkOH) {
                throw new Error("Check no encontrado");
            }
            await checkoutHerramientaService.update(id, {
                herramienta_id: checkOH.herramienta_id,
                usuario_id: checkOH.usuario_id,
                hora_de_check: checkOH.hora_de_check,
                delete: true
            });
            return { message: "check eliminado correctamente"}
        } catch (error) {
            throw new Error("Error al eliminar el check out herramienta: " + error.message);
        }
    }
}

export const checkoutHerramientaService = new CheckoutHerramientaService();