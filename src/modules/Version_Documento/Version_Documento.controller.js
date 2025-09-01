import { versionDocumentoService } from "./Version_Documento.service.js";

export const getAllVersiones = async (req, res) => {
    try {
        const versiones = await versionDocumentoService.getAll();
        res.status(200).json({
            success: true,
            data: versiones
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getVersionById = async (req, res) => {
    try {
        const { id } = req.params;
        const version = await versionDocumentoService.getById(id);
        res.status(200).json({
            success: true,
            data: version
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createVersion = async (req, res) => {
    try {
        const data = req.body;
        const nuevaVersion = await versionDocumentoService.create(data);
        res.status(201).json({
            success: true,
            data: nuevaVersion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateVersion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedVersion = await versionDocumentoService.update(id, data);
        res.status(200).json({
            success: true,
            data: updatedVersion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteVersion = async (req, res) => {
    try {
        const { id } = req.params;
        await versionDocumentoService.delete(id);
        res.status(200).json({
            success: true,
            message: "Versión de documento eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createVersionWithAutoIncrement = async (req, res) => {
    try {
        const { planoId, creado_por, archivo_ruta, notas } = req.body;
        const nuevaVersion = await versionDocumentoService.createWithAutoVersion({
            planoId,
            creado_por,
            archivo_ruta,
            notas
        });
        res.status(201).json({
            success: true,
            data: nuevaVersion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}