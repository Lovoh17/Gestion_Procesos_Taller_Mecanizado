import { usuarioService } from "./Usuario.service.js";

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password, puesto_id, estado_id, foto_ruta, es_subcontratado, fecha_contratacion, fecha_termino_contrato, habilidades_tecnicas, turno_id, ultimo_acceso, timestamps } = req.body;
        const nuevaUsuario = await usuarioService.create({
            nombre,
            apellido,
            email,
            password,
            puesto_id,
            estado_id,
            foto_ruta,
            es_subcontratado,
            fecha_contratacion,
            fecha_termino_contrato,
            habilidades_tecnicas,
            turno_id,
            ultimo_acceso,
            timestamps
        });
        res.status(200).json(nuevaUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.getById(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, password, puesto_id, estado_id, foto_ruta, es_subcontratado, fecha_contratacion, fecha_termino_contrato, habilidades_tecnicas, turno_id, ultimo_acceso, timestamps } = req.body;
        const usuarioActualizado = await usuarioService.update(id, {
            nombre,
            apellido,
            email,
            password,
            puesto_id,
            estado_id,
            foto_ruta,
            es_subcontratado,
            fecha_contratacion,
            fecha_termino_contrato,
            habilidades_tecnicas,
            turno_id,
            ultimo_acceso,
            timestamps
        });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioService.delete(id);
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
