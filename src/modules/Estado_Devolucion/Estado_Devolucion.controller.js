import { estadoDevolucionService } from "./Estado_Devolucion.service.js";

export const crearEstadoDevolucion = async (req, res) => {
    try {
<<<<<<< HEAD:src/modules/Estado_Devolucion/Estado_Devolucion.controller.js
        const { nombre_estado } = req.body;
=======
        const { nombre_estado} = req.body;
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Estados_Devolucion/Estado_Devolucion.controller.js
        const nuevaEstadoDevolucion = await estadoDevolucionService.create({
            nombre_estado,
            
        });
        res.status(201).json(nuevaEstadoDevolucion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerEstadoDevolucionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estados_devolucion = await estadoDevolucionService.getById(id);
        res.status(200).json(estados_devolucion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerEstadoDevolucion = async (req, res) => {
    try {
        const estados_devolucion = await estadoDevolucionService.getAll();
        res.status(200).json(estados_devolucion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarEstadoDevolucion = async (req, res) => {
    try {
        const { id } = req.params;
<<<<<<< HEAD:src/modules/Estado_Devolucion/Estado_Devolucion.controller.js
        const { nombre_estado } = req.body;
=======
        const { nombre_estado} = req.body;
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Estados_Devolucion/Estado_Devolucion.controller.js
        const estados_devolucionActualizada = await estadoDevolucionService.update(id, {
            nombre_estado
        });
        res.status(200).json(estados_devolucionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarEstadoDevolucion = async (req, res) => {
    try {
        const { id } = req.params;
        await estadoDevolucionService.delete(id);
        res.status(200).json({ message: "Estado devolucion eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
