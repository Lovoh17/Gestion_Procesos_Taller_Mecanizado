import { Estado_Herramienta } from "../Estado_Herramienta/Estado_Herramienta.js";
import { herramientaService } from "../Herramienta/Herramienta.service.js";
import { CheckoutHerramienta } from "./CheckOutHerramienta.js";
import { Reserva_Herramienta } from "../Reservas_Herramientas/Reserva_Herramienta.js";
import { Op } from "sequelize";

class CheckoutHerramientaService{
    async getAll(){
        try {
            const checkoutHerramienta = await CheckoutHerramienta.findAll({where:{delete:false}});
            return checkoutHerramienta;
        } catch (error) {
            throw new Error("Error al obtener todos lo checks de las herramientas: " + error.message);
        }
    }
    async getAllForce(){
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
    async create(data) {
        try {
            const herramienta = await herramientaService.getById(data.herramienta_id);
            if (!herramienta) throw new Error("Herramienta no encontrada");

            const estado_herramienta = await Estado_Herramienta.findOne({
                where: { id: herramienta.estado_herramienta_id }
            });
            this.verificacion(estado_herramienta);

            const fechaCheckout = data.hora_de_check || new Date();
            const reservasConflicto = await Reserva_Herramienta.findAll({
                where: {
                    herramienta_id: data.herramienta_id,
                    estado: "reservado",
                    fecha_reserva: { [Op.lte]: fechaCheckout },
                    fecha_devolucion: { [Op.gte]: fechaCheckout }
                }
            });

            if (reservasConflicto.length > 0) {
                const reserva = reservasConflicto[0];
                throw new Error(
                    `La herramienta está reservada por el usuario ${reserva.usuario_id} 
                    desde ${reserva.fecha_reserva} hasta ${reserva.fecha_devolucion}`
                );
            }

            await Reserva_Herramienta.update(
                { estado: "completado" },
                {
                    where: {
                        herramienta_id: data.herramienta_id,
                        usuario_id: data.usuario_id,
                        estado: "reservado",
                        fecha_reserva: { [Op.lte]: fechaCheckout },
                        fecha_devolucion: { [Op.gte]: fechaCheckout }
                    }
                }
            );

            const nuevaCOH = await CheckoutHerramienta.create(data);
            return nuevaCOH;

        } catch (error) {
            throw new Error("Error al crear el check de la herramienta: " + error.message);
        }
    }

    async update (id, data){
        try {
            const checkOH = await CheckoutHerramienta.findByPk(id);
            if (!checkOH) {
                throw new Error("Check no encontrado");
            }

            const herramienta = await herramientaService.getById(data.herramienta_id);
            if (!herramienta) {
                throw new Error("Herramienta no encontrada");
            }
            
            const estado_herramienta = await Estado_Herramienta.findOne({
                where: {id: herramienta.estado_herramienta_id}
            });
            this.verificacion(estado_herramienta);
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
            await this.update(id, {
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
    verificacion(estado_herramienta){
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
    }
    async getEstadisticasUso({ top = 5 } = {}) {
        try {
            const herramientasMasUsadas = await CheckoutHerramienta.findAll({
                attributes: [
                    "herramienta_id",
                    [sequelize.fn("COUNT", sequelize.col("herramienta_id")), "veces_usada"]
                ],
                group: ["herramienta_id"],
                order: [[sequelize.literal("veces_usada"), "DESC"]],
                limit: top
            });

            const tiemposPrestamo = await CheckoutHerramienta.findAll({
                attributes: [
                    "herramienta_id",
                    [sequelize.fn(
                        "AVG",
                        sequelize.fn(
                            "TIMESTAMPDIFF",
                            sequelize.literal("HOUR"),
                            sequelize.col("hora_de_check"),
                            sequelize.col("hora_de_devolucion")
                        )
                    ), "promedio_horas"]
                ],
                where: {
                    hora_de_devolucion: { [Op.ne]: null }
                },
                group: ["herramienta_id"]
            });

            const usoPorUsuario = await CheckoutHerramienta.findAll({
                attributes: [
                    "usuario_id",
                    [sequelize.fn("COUNT", sequelize.col("usuario_id")), "total_checkouts"]
                ],
                group: ["usuario_id"],
                order: [[sequelize.literal("total_checkouts"), "DESC"]]
            });

            return {
                herramientasMasUsadas,
                tiemposPrestamo,
                usoPorUsuario
            };

        } catch (error) {
            throw new Error("Error al obtener estadísticas de uso: " + error.message);
        }
    }
    
}

export const checkoutHerramientaService = new CheckoutHerramientaService();