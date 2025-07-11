import { Estado_Entrega } from "./Estado_Entrega.js";

class EstadoEntregaService{
    async getAll() {
        try {
            const estados = await Estado_Entrega.findAll();
            return estados;
        } catch (error) {
            throw new Error("Error al obtener los estados de entrega: " + error.message);
        }
    }

    
        async getById(id) {
            try {
                const estado_entrega = await Estado_Entrega.findByPk(id);
                if (!estado_entrega) {
                    throw new Error("Estado entrega no encontrado");
                }
                return estado_entrega;
            } catch (error) {
                throw new Error("Error al obtener el estado entrega: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const estado_entrega = await Estado_Entrega.create(data);
                return estado_entrega;
            } catch (error) {
                throw new Error("Error al crear el estado entrega: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const estado_entrega = await Estado_Entrega.findByPk(id);
                if (!estado_entrega) {
                    throw new Error("Estado entrega no encontrada");
                }
                await estado_entrega.update(data);
                return estado_entrega;
            } catch (error) {
                throw new Error("Error al actualizar el estado entrega: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const estado_entrega = await Estado_Entrega.findByPk(id);
                if (!estado_entrega) {
                    throw new Error("Estado entrega no encontrada");
                }
                await estado_entrega.destroy();
                return { message: "Estado entrega eliminada" };
            } catch (error) {
                throw new Error("Error al eliminar el estado entrega: " + error.message);
            }
        }

    
}

export const estadoEntregaService = new EstadoEntregaService();