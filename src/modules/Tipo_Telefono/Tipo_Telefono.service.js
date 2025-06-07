import { Tipo_Telefono } from "./Tipo_Telefono.js";

class TipoTelefonoService{
    async getAll() {
        try {
            const tiposTelefono = await Tipo_Telefono.findAll();
            return tiposTelefono;
        } catch (error) {
            throw new Error("Error al obtener los tipos de teléfono: " + error.message);
        }
    }

    async getById(id) {
        try {
            const tipoTelefono = await Tipo_Telefono.findByPk(id);
            if (!tipoTelefono) {
                throw new Error("Tipo de teléfono no encontrado");
            }
            return tipoTelefono;
        } catch (error) {
            throw new Error("Error al obtener el tipo de teléfono: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoTipoTelefono = await Tipo_Telefono.create(data);
            return nuevoTipoTelefono;
        } catch (error) {
            throw new Error("Error al crear el tipo de teléfono: " + error.message);
        }
    }
    async update(id, data) {
        try {
            const tipoTelefono = await Tipo_Telefono.findByPk(id);
            if (!tipoTelefono) {
                throw new Error("Tipo de teléfono no encontrado");
            }
            await tipoTelefono.update(data);
            return tipoTelefono;
        } catch (error) {
            throw new Error("Error al actualizar el tipo de teléfono: " + error.message);
        }
    }
    async delete(id) {
        try {
            const tipoTelefono = await Tipo_Telefono.findByPk(id);
            if (!tipoTelefono) {
                throw new Error("Tipo de teléfono no encontrado");
            }
            await tipoTelefono.destroy();
            return { message: "Tipo de teléfono eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el tipo de teléfono: " + error.message);
        }
    }
    async getByName(nombre) {
        try {
            const tipoTelefono = await Tipo_Telefono.findOne({ where: { nombre } });
            if (!tipoTelefono) {
                throw new Error("Tipo de teléfono no encontrado");
            }
            return tipoTelefono;
        } catch (error) {
            throw new Error("Error al obtener el tipo de teléfono por nombre: " + error.message);
        }
    }

}

export const tipoTelefonoService = new TipoTelefonoService();