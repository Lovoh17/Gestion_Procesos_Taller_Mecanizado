import {Puesto} from './Puesto.js';

class PuestoService {
    async getAll() {
        try {
            const puestos = await Puesto.findAll();
            return puestos;
        } catch (error) {
            throw new Error("Error al obtener los puestos: " + error.message);
        }
    }

    async getById(id) {
        try {
            const puesto = await Puesto.findByPk(id);
            if (!puesto) {
                throw new Error("Puesto no encontrado");
            }
            return puesto;
        } catch (error) {
            throw new Error("Error al obtener el puesto: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevoPuesto = await Puesto.create(data);
            return nuevoPuesto;
        } catch (error) {
            throw new Error("Error al crear el puesto: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const puesto = await Puesto.findByPk(id);
            if (!puesto) {
                throw new Error("Puesto no encontrado");
            }
            await puesto.update(data);
            return puesto;
        } catch (error) {
            throw new Error("Error al actualizar el puesto: " + error.message);
        }
    }

    async delete(id) {
        try {
            const puesto = await Puesto.findByPk(id);
            if (!puesto) {
                throw new Error("Puesto no encontrado");
            }
            await puesto.destroy();
            return { message: "Puesto eliminado" };
        } catch (error) {
            throw new Error("Error al eliminar el puesto: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const puesto = await Puesto.findOne({ where: { nombre } });
            if (!puesto) {
                throw new Error("Puesto no encontrado");
            }
            return puesto;
        } catch (error) {
            throw new Error("Error al obtener el puesto por nombre: " + error.message);
        }
    }
}

export const puestoService = new PuestoService();