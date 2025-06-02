import {Tipo_Stock} from "./Tipo_Stock.js";

class TipoStockService {
    async getAll() {
        try {
            const tiposStock = await Tipo_Stock.findAll();
            return tiposStock;
        } catch (error) {
            throw new Error("Error al obtener los tipos de stock: " + error.message);
        }
    }

    async getById(id) {
        try {
            const tipoStock = await Tipo_Stock.findByPk(id);
            if (!tipoStock) {
                throw new Error("Tipo de stock no encontrado");
            }
            return tipoStock;
        } catch (error) {
            throw new Error("Error al obtener el tipo de stock: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTipoStock = await Tipo_Stock.create(data);
            return nuevoTipoStock;
        } catch (error) {
            throw new Error("Error al crear el tipo de stock: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const tipoStock = await Tipo_Stock.findByPk(id);
            if (!tipoStock) {
                throw new Error("Tipo de stock no encontrado");
            }
            await tipoStock.update(data);
            return tipoStock;
        } catch (error) {
            throw new Error("Error al actualizar el tipo de stock: " + error.message);
        }
    }

    async delete(id) {
        try {
            const tipoStock = await Tipo_Stock.findByPk(id);
            if (!tipoStock) {
                throw new Error("Tipo de stock no encontrado");
            }
            await tipoStock.destroy();
            return { message: "Tipo de stock eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el tipo de stock: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const tipoStock = await Tipo_Stock.findOne({ where: { nombre } });
            if (!tipoStock) {
                throw new Error("Tipo de stock no encontrado");
            }
            return tipoStock;
        } catch (error) {
            throw new Error("Error al obtener el tipo de stock por nombre: " + error.message);
        }
    }
}

export const tipoStockService = new TipoStockService();