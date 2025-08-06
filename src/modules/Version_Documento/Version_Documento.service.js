import { Version_Documento } from "./Version_Documento.js";
import { Plano } from "../Plano/Plano.js";
import { Usuario } from "../Usuario/Usuario.js";

class VersionDocumentoService {
    async getAll() {
        try {
            const versiones = await Version_Documento.findAll({
                include: [
                    { model: Plano, as: 'plano' },
                    { model: Usuario, as: 'creadoPor' }
                ]
            });
            return versiones;
        } catch (error) {
            throw new Error("Error al obtener las versiones de documentos: " + error.message);
        }
    }

    async getById(id) {
        try {
            const version = await Version_Documento.findByPk(id, {
                include: [
                    { model: Plano, as: 'plano' },
                    { model: Usuario, as: 'creadoPor' }
                ]
            });
            if (!version) {
                throw new Error("Versión de documento no encontrada");
            }
            return version;
        } catch (error) {
            throw new Error("Error al obtener la versión de documento: " + error.message);
        }
    }

    async create(data) {
        try {
            const nuevaVersion = await Version_Documento.create(data);
            return nuevaVersion;
        } catch (error) {
            throw new Error("Error al crear la versión de documento: " + error.message);
        }
    }

    async update(id, data) {
        try {
            const version = await Version_Documento.findByPk(id);
            if (!version) {
                throw new Error("Versión de documento no encontrada");
            }
            await version.update(data);
            return version;
        } catch (error) {
            throw new Error("Error al actualizar la versión de documento: " + error.message);
        }
    }

    async delete(id) {
        try {
            const version = await Version_Documento.findByPk(id);
            if (!version) {
                throw new Error("Versión de documento no encontrada");
            }
            await version.destroy();
            return { message: "Versión de documento eliminada" };
        } catch (error) {
            throw new Error("Error al eliminar la versión de documento: " + error.message);
        }
    }

    async createWithAutoVersion({ planoId, creado_por, archivo_ruta, notas }) {
        const ultima = await Version_Documento.findOne({
            where: { planoId },
            order: [['numero_version', 'DESC']]
        });
        const nuevaVersion = (ultima?.numero_version || 0) + 1;
        return await Version_Documento.create({
            planoId,
            numero_version: nuevaVersion,
            creado_por,
            archivo_ruta,
            notas
        });
    }

}

export const versionDocumentoService = new VersionDocumentoService();
