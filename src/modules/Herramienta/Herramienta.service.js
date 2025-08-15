import { Usuario } from "../Usuario/Usuario.js";
import { Herramienta } from "./Herramienta.js";
import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";


class HerramientaService{
    async getAll() {
        try {
            const herramientas = await Herramienta.findAll();
            return herramientas;
        } catch (error) {
            throw new Error("Error al obtener las herramientas: " + error.message);
        }
    }

    async getById(id) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            return herramienta;
        } catch (error) {
            throw new Error("Error al obtener la herramienta: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaHerramienta = await Herramienta.create(data);
            return nuevaHerramienta;
        } catch (error) {
            throw new Error("Error al crear la herramienta: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            await herramienta.update(data);
            return herramienta;
        } catch (error) {
            throw new Error("Error al actualizar la herramienta: " + error.message);
        }
    }

    async delete(id) {
        try {
            const herramienta = await Herramienta.findByPk(id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            await herramienta.destroy();
            return { message: "Herramienta eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la herramienta: " + error.message);
        }
    }
    async checkout(id, id_usuario){
        try {
            // obtengo los modelos y verifico
            const herramienta = await Herramienta.findByPk(id);
            const usuario = await Usuario.findByPk(id_usuario);

            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            if (!usuario) {
                throw new Error("Usuario no encontrada");
            }
            /* Se comento para probar esta verificacion en el historial de checksOuts
            //sabiendo que se increso una herramienta existente se verifica su estado
            const estado_herramienta = await Estado_Herramienta.findOne({
                where: {id: herramienta.herramienta_id}
            });
            const estadoSimplificado = (estado_herramienta.nombre).toLowerCase();
            if (!estadoSimplificado.include("disponible") ) {
                if (estadoSimplificado.include("uso")) {
                    throw new Error("La herramienta esta en uso");
                }else if (estadoSimplificado.include("dañada")) {
                    throw new Error("La herramienta esta dañada");
                }else if (estadoSimplificado.include("reservado")) {
                    throw new Error("La herramienta esta reservada");
                }else if (estadoSimplificado.include("mantenimiento")) {
                    throw new Error("La herramienta esta en mantenimiento");
                }
            }
            //seguir*/
        

        } catch (error) {
            throw new Error("Error al eliminar la herramienta: " + error.message);
        }
    }
}

export const herramientaService = new HerramientaService();