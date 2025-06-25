import { estadoReparacionService } from "./Estado_Reparacion.service.js";

export const crearEstadoReparacion = async (req, res)=>{
    try {
        const {nombre_estado} = req.body;
        const nuevoEstadoReparacion = await estadoReparacionService.create({
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
        const EstadoReparacion = await estadoReparacionService.getById(id);
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadoReparacionPorNombre = async (req, res) => {
    try {
        const {nombre_estado} = req.params;
        const EstadoReparacion = await estadoReparacionService.getByName(nombre_estado);
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadosReparacion = async (req, res)=>{
    try {
        const estadoReparacion = await estadoReparacionService.getAll();
        res.status(200).json(estadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const actualizarEstadoTrabajo = async (req, res) =>{
    try {
        const {id} = req.params;
        const { nombre_estado} = req.body;
        const EstadoReparacion = await estadoReparacionService.update(id, {nombre_estado});
        res.status(200).json(EstadoReparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const eliminarEstadoTrabajo = async (req, res) => {
    try {
        const {id} = req.params;
        await estadoReparacionService.delete(id);
        res.status(200).json({message: "Estado de Reparacion eliminado"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

