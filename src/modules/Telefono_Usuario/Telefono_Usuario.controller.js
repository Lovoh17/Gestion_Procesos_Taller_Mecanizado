import { TelefonoUsuarioService } from "./Telefono_Usuario.service.js";

export const crearTelefonoUsuario = async (req, res) => {
    try {
        const { usuario_id, tipo_telefono_id, numero, es_principal, timestamps } = req.body;
        const nuevaTelefonoUsuario = await TelefonoUsuarioService.create({
            usuario_id,
            tipo_telefono_id,
            numero,
            es_principal,
            timestamps
        });
        res.status(200).json(nuevaTelefonoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTelefonoUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const telefonoUsuario = await TelefonoUsuarioService.getById(id);
        res.status(200).json(telefonoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerTelefonosUsuario = async (req, res) => {
    try {
        const telefonosUsuario = await TelefonoUsuarioService.getAll();
        res.status(200).json(telefonosUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarTelefonoUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, tipo_telefono_id, numero, es_principal, timestamps } = req.body;
        const telefonoUsuarioActualizada = await TelefonoUsuarioService.update(id, {
            usuario_id,
            tipo_telefono_id,
            numero,
            es_principal,
            timestamps
        });
        res.status(200).json(telefonoUsuarioActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarTelefonoUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await TelefonoUsuarioService.delete(id);
        res.status(200).json({ message: "Zona de trabajo eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
