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
<<<<<<< HEAD
        const estado_reparacion = await estadoReparacionService.getById(id);
        res.status(200).json(estado_reparacion);
=======
        const EstadoReparacion = await estadoReparacionService.getById(id);
        res.status(200).json(EstadoReparacion);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadoReparacionPorNombre = async (req, res) => {
    try {
        const {nombre_estado} = req.params;
<<<<<<< HEAD
        const estado_reparacion = await estadoReparacionService.getByName(nombre_estado);
        res.status(200).json(estado_reparacion );
=======
        const EstadoReparacion = await estadoReparacionService.getByName(nombre_estado);
        res.status(200).json(EstadoReparacion);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerEstadosReparacion = async (req, res)=>{
    try {
<<<<<<< HEAD
        const estado_reparacion = await estadoReparacionService.getAll();
        res.status(200).json(estado_reparacion);
=======
        const estadoReparacion = await estadoReparacionService.getAll();
        res.status(200).json(estadoReparacion);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const actualizarEstadoTrabajo = async (req, res) =>{
    try {
        const {id} = req.params;
<<<<<<< HEAD
        const { nombre_estado } = req.body;
        const estado_reparacion = await estadoReparacionService.update(id, {nombre_estado});
        res.status(200).json(estado_reparacion);
=======
        const { nombre_estado} = req.body;
        const EstadoReparacion = await estadoReparacionService.update(id, {nombre_estado});
        res.status(200).json(EstadoReparacion);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
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

