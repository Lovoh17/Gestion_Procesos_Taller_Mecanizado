import { usuarioService } from "./Usuario.service.js";
import bcrypt from "bcrypt";


export const crearUsuario = async (req, res) => {
    try {
        const { 
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
        } = req.body;

        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, apellido, email y contraseña son requeridos'
            });
        }

        const existente = await usuarioService.getByEmail?.(email);
        if (existente) {
            return res.status(409).json({
                success: false,
                message: 'El correo ya está en uso'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuarioData = {
            nombre,
            apellido,
            email,
            password: hashedPassword, 
            puesto_id: puesto_id || 2,
            estado_id: estado_id || 1,
            foto_ruta: foto_ruta || null,
            es_subcontratado: Boolean(es_subcontratado),
            fecha_contratacion: fecha_contratacion || null,
            fecha_termino_contrato: fecha_termino_contrato || null,
            habilidades_tecnicas: habilidades_tecnicas || null,
            turno_id: turno_id || null,
            ultimo_acceso:  new Date(),
            timestamps: true
        };

        const nuevaUsuario = await usuarioService.create(usuarioData);
        
        res.status(201).json({
            success: true,
            data: nuevaUsuario,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al crear usuario',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
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
        const { 
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
            turno_id 
        } = req.body;

        // Campos que realmente se pueden editar
        const updateData = {
            nombre,
            apellido,
            email,
            puesto_id,
            estado_id,
            foto_ruta,
            es_subcontratado,
            fecha_contratacion,
            fecha_termino_contrato,
            habilidades_tecnicas,
            turno_id
        };

        // Solo actualizar password si se proporcionó
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password =  hashedPassword;
        }

        const usuarioActualizado = await usuarioService.update(id, updateData);
        
        res.status(200).json({
            success: true,
            data: usuarioActualizado,
            message: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ 
            success: false,
            error: error.message,
            message: 'Error al actualizar el usuario'
        });
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

export const obtenerUsuariosPorIdPuesto = async (req, res)=>{
    try {
        const {puesto_id} = req.params;
        const usuarios = await usuarioService.getByPuestoId(puesto_id);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}