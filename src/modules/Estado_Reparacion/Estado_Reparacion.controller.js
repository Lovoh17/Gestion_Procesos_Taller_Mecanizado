import { EstadoReparacionService } from "./Estado_Reparacion.service.js";

export const crearEstadoReparacion = async (req, res)=>{
    try {
        const {nombre_estado} = req.body;
        const nuevoEstadoReparacion = await EstadoReparacionService.create({
            nombre_estado,
        });
        res.status(201).json(nuevoEstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadosReparacionPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const EstadoReparacion = await EstadoReparacionService.getById(id);
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadoReparacionPorNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        const EstadoReparacion = await EstadoReparacionService.getByName(nombre);
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadosReparacion = async (req, res)=>{
    try {
        const estadoReparacion = await EstadoReparacionService.getAll();
        res.status(200).json(estadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const actualizarEstadoTrabajo = async (req, res) =>{
    try {
        const {id} = req.params;
        const { nombre_estado} = req.body;
        const EstadoReparacion = await EstadoReparacionService.update(id, {nombre_estado});
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const eliminarEstadoTrabajo = async (req, res) => {
    try {
        const {id} = req.params;
        await EstadoReparacionService.delete(id);
        res.status(200).json({message: "Estado de Reparacion eliminado"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

