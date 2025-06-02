import {Tipo_Pedido} from "./Tipo_Pedido.js";

class TipoPedidoService {
    async getAll() {
        try {
            const tiposPedido = await Tipo_Pedido.findAll();
            return tiposPedido;
        } catch (error) {
            throw new Error("Error al obtener los tipos de pedido: " + error.message);
        }
    }

    async getById(id) {
        try {
            const tipoPedido = await Tipo_Pedido.findByPk(id);
            if (!tipoPedido) {
                throw new Error("Tipo de pedido no encontrado");
            }
            return tipoPedido;
        } catch (error) {
            throw new Error("Error al obtener el tipo de pedido: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTipoPedido = await Tipo_Pedido.create(data);
            return nuevoTipoPedido;
        } catch (error) {
            throw new Error("Error al crear el tipo de pedido: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const tipoPedido = await Tipo_Pedido.findByPk(id);
            if (!tipoPedido) {
                throw new Error("Tipo de pedido no encontrado");
            }
            await tipoPedido.update(data);
            return tipoPedido;
        } catch (error) {
            throw new Error("Error al actualizar el tipo de pedido: " + error.message);
        }
    }

    async delete(id) {
        try {
            const tipoPedido = await Tipo_Pedido.findByPk(id);
            if (!tipoPedido) {
                throw new Error("Tipo de pedido no encontrado");
            }
            await tipoPedido.destroy();
            return { message: "Tipo de pedido eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el tipo de pedido: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const tipoPedido = await Tipo_Pedido.findOne({ where: { nombre } });
            if (!tipoPedido) {
                throw new Error("Tipo de pedido no encontrado");
            }
            return tipoPedido;
        } catch (error) {
            throw new Error("Error al obtener el tipo de pedido por nombre: " + error.message);
        }
    }
}

export const tipoPedidoService = new TipoPedidoService();