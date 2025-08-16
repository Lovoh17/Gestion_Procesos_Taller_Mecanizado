import { Usuario } from "../Usuario/Usuario.js";
import { Herramienta } from "./Herramienta.js";
import { estadoHerramientaService } from "../Estado_Herramienta/Estado_Herramienta.sevice.js";
import { checkoutHerramientaService } from "../CheckOut_Herramienta/CheckOutHerramienta.service.js";


class HerramientaService {
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
    async checkout(id, id_usuario) {
        try {
            // Ejecutar búsquedas en paralelo
            const [herramienta, usuario] = await Promise.all([
                Herramienta.findByPk(id),
                Usuario.findByPk(id_usuario)
            ]);

            if (!herramienta) throw new Error("Herramienta no encontrada");
            if (!usuario) throw new Error("Usuario no encontrado");

            //seguir*/
            const horaActual = new Date();//aqui

            const CHO = await checkoutHerramientaService.create({
                herramienta_id: herramienta.id,
                usuario_id: usuario.id,
                hora_de_check: horaActual,//en DataTypes es DATEONLY
                delete: false
            });

            herramienta.estado_herramienta_id =  await this.buscador("uso"); 
            console.log("ID herramienta:", id);
            console.log("Nuevo estado:", herramienta.estado_herramienta_id);

            await this.update(
                id,
                { estado_herramienta_id: herramienta.estado_herramienta_id }
            );
            return herramienta;

        } catch (error) {
            throw new Error("Error al hacer checkOut para esta herramienta: " + error.message);
        }
    }
    async buscador(nombre) {
        const estadosHerramienta = await estadoHerramientaService.getAll();
        const estado = estadosHerramienta.find(e => e.nombre.toLowerCase().includes(nombre));
    
        if (!estado) {
            throw new Error("El estado de herramienta que busca no existe.");
        }
        return estado.id;
    }

    async checkin(idCHO) {
        try {
            // Buscar el registro de checkout
            const CHO = await checkoutHerramientaService.getById(idCHO);
            if (!CHO) throw new Error("Registro de checkout no encontrado");
    
            // Buscar herramienta asociada
            const herramienta = await Herramienta.findByPk(CHO.herramienta_id);
            if (!herramienta) throw new Error("Herramienta no encontrada");
    
            // Cambiar estado del checkout a eliminado
            CHO.delete = true;
            await CHO.save();
    
            // Cambiar estado de herramienta a "disponible"
            herramienta.estado_herramienta_id = await this.buscador("disponible");
            await herramienta.save();
    
            return CHO;
    
        } catch (error) {
            throw new Error("Error al hacer checkIn para esta herramienta: " + error.message);
        }
    }
    
}

export const herramientaService = new HerramientaService();