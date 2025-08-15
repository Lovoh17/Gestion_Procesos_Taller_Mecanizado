import { AsignacionPedido } from "./AsignacionPedido.js";
import { Usuario } from "../Usuario/Usuario.js";
import { Pedido } from "../Pedido/Pedido.js";
import { Competencia } from "../Competencia/Competencia.js";

class AsignacionInteligenteService {
    async getAll() {
        try {
            const asignaciones = await AsignacionPedido.findAll({
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Pedido, as: 'pedido' }
                ]
            });
            return asignaciones;
        } catch (error) {
            throw new Error("Error al obtener las asignaciones: " + error.message);
        }
    }

    async getById(id) {
        try {
            const asignacion = await AsignacionPedido.findByPk(id, {
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Pedido, as: 'pedido' }
                ]
            });
            if (!asignacion) {
                throw new Error("Asignación no encontrada");
            }
            return asignacion;
        } catch (error) {
            throw new Error("Error al obtener la asignación: " + error.message);
        }
    }

    async create(data) {
        try {
            const count = await AsignacionPedido.count({ where: { usuarioId: data.usuarioId } });
            if (count >= 1) {
                throw new Error("El trabajador ya tiene 1 pedidos asignados");
            }

            const existe = await AsignacionPedido.findOne({ 
                where: { usuarioId: data.usuarioId, pedidoId: data.pedidoId } 
            });
            if (existe) {
                throw new Error("Este trabajador ya está asignado a este pedido");
            }

            return await AsignacionPedido.create(data);
        } catch (error) {
            throw new Error("Error al crear la asignación: " + error.message);
        }
    }


    async update(id, data) {
        try {
            const asignacion = await AsignacionPedido.findByPk(id);
            if (!asignacion) {
                throw new Error("Asignación no encontrada");
            }
            await asignacion.update(data);
            return asignacion;
        } catch (error) {
            throw new Error("Error al actualizar la asignación: " + error.message);
        }
    }

    async delete(id) {
        try {
            const asignacion = await AsignacionPedido.findByPk(id);
            if (!asignacion) {
                throw new Error("Asignación no encontrada");
            }
            await asignacion.destroy();
            return { message: "Asignación eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la asignación: " + error.message);
        }
    }

    async sugerirUsuarios(pedidoId, competenciaId) {
        try {
            const pedido = await Pedido.findByPk(pedidoId);
            if (!pedido) throw new Error("Pedido no encontrado");

            const usuarios = await Usuario.findAll({
                include: [
                    {
                        model: Competencia,
                        as: "competencias",
                        where: { id: competenciaId },
                        required: true
                    },
                    {
                        model: Pedido,
                        as: "pedidos",
                        through: { attributes: ["horasAsignadas"] }
                    }
                ]
            });

            return usuarios.map(usuario => {
                const horasAsignadas = usuario.pedidos.reduce((total, p) => total + (p.AsignacionPedido?.horasAsignadas || 0), 0);
                const carga = (horasAsignadas / usuario.capacidad_horas_semana) * 100;

                let nivel;
                if (carga === 0) nivel = 1;
                else if (carga < 50) nivel = 2;
                else if (carga < 80) nivel = 3;
                else nivel = 4;

                return {
                    usuario,
                    carga,
                    nivel,
                    sobrecarga: carga > 85
                };
            }).sort((a, b) => a.nivel - b.nivel);
        } catch (error) {
            throw new Error("Error al sugerir usuarios: " + error.message);
        }
    }
    
    async getByPuestoId(puesto_id) {
        try {
            const usuarios = await Usuario.findAll({ where: { puesto_id: puesto_id } });
            if (usuarios.length === 0) {
                throw new Error("No se encontraron usuarios para el puesto especificado");
            }
            return usuarios;
        } catch (error) {
            throw new Error("Error al obtener usuarios por puesto: " + error.message);
        }
    }
}

export const asignacionInteligenteService = new AsignacionInteligenteService();