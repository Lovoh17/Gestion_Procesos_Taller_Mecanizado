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
        const estado_reparacion = await estadoReparacionService.getById(id);
        res.status(200).json(estado_reparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadoReparacionPorNombre = async (req, res) => {
    try {
        const {nombre_estado} = req.params;
        const estado_reparacion = await estadoReparacionService.getByName(nombre_estado);
        res.status(200).json(estado_reparacion );
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadosReparacion = async (req, res)=>{
    try {
        const estado_reparacion = await estadoReparacionService.getAll();
        res.status(200).json(estado_reparacion);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const actualizarEstadoTrabajo = async (req, res) =>{
    try {
        const {id} = req.params;
        const { nombre_estado } = req.body;
        const estado_reparacion = await estadoReparacionService.update(id, {nombre_estado});
        res.status(200).json(estado_reparacion);
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

