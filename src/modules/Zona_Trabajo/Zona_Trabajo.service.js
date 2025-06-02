import { Zona_Trabajo } from "./Zona_Trabajo.js";

class ZonaTrabajoService {
    async getAll() {
        try {
            const zonasTrabajo = await Zona_Trabajo.findAll();
            return zonasTrabajo;
        } catch (error) {
            throw new Error("Error al obtener las zonas de trabajo: " + error.message);
        }
    }

    async getById(id) {
        try {
            const zonaTrabajo = await Zona_Trabajo.findByPk(id);
            if (!zonaTrabajo) {
                throw new Error("Zona de trabajo no encontrada");
            }
            return zonaTrabajo;
        } catch (error) {
            throw new Error("Error al obtener la zona de trabajo: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaZonaTrabajo = await Zona_Trabajo.create(data);
            return nuevaZonaTrabajo;
        } catch (error) {
            throw new Error("Error al crear la zona de trabajo: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const zonaTrabajo = await Zona_Trabajo.findByPk(id);
            if (!zonaTrabajo) {
                throw new Error("Zona de trabajo no encontrada");
            }
            await zonaTrabajo.update(data);
            return zonaTrabajo;
        } catch (error) {
            throw new Error("Error al actualizar la zona de trabajo: " + error.message);
        }
    }

    async delete(id) {
        try {
            const zonaTrabajo = await Zona_Trabajo.findByPk(id);
            if (!zonaTrabajo) {
                throw new Error("Zona de trabajo no encontrada");
            }
            await zonaTrabajo.destroy();
            return { message: "Zona de trabajo eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la zona de trabajo: " + error.message);
        }
    }

    async getByName(nombre) {
        try {
            const zonaTrabajo = await Zona_Trabajo.findOne({ where: { nombre } });
            if (!zonaTrabajo) {
                throw new Error("Zona de trabajo no encontrada");
            }
            return zonaTrabajo;
        } catch (error) {
            throw new Error("Error al obtener la zona de trabajo por nombre: " + error.message);
        }
    }

    async getByResponsableId(responsable_id) {
        try {
            const zonasTrabajo = await Zona_Trabajo.findAll({ where: { responsable_id } });
            if (zonasTrabajo.length === 0) {
                throw new Error("No se encontraron zonas de trabajo para el responsable especificado");
            }
            return zonasTrabajo;
        } catch (error) {
            throw new Error("Error al obtener las zonas de trabajo por responsable: " + error.message);
        }
    }
}

export const zonaTrabajoService = new ZonaTrabajoService();