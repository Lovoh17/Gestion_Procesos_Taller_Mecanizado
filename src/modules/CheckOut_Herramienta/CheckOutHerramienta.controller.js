import { checkoutHerramientaService } from "./CheckOutHerramienta.service.js";


export const crearCOH = async (req, res) => {
    try {
        const { herramienta_id, usuario_id, hora_de_check} = req.body;
        const nuevaCOH = await checkoutHerramientaService.create({
            herramienta_id, 
            usuario_id,
            hora_de_check,
            delete:false
        });
        res.status(200).json(nuevaCOH);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export const obtenertodosCOH = async (req, res) =>{
    try {
        const  checkOH = await checkoutHerramientaService.getAll();
        res.status(200).json(checkOH);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerCOHPorId = async (req,res) =>{
    try {
        const {id} = req.params;
        const checkOH = await checkoutHerramientaService.getById(id);
        res.status(200).json(checkOH);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const actualizarCOH = async (req,res) =>{
    try {
        const { id } = req.params;
        const { herramienta_id, usuario_id, hora_de_check} = req.body;
        const COHActualizada = await checkoutHerramientaService.update({
            herramienta_id, 
            usuario_id,
            hora_de_check,
            delete:false
        });
        res.status(200).json(COHActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const eliminarCOH = async (req, res) =>{
    try {
        const { id} = req.params;
        await checkoutHerramientaService.delete(id);
        res.status(200).json({message:"Check Fue elimina con exito; felidades"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerTODOSCOH = async (req,res) =>{
    try {
        const  checkOH = await checkoutHerramientaService.getAllForce();
        res.status(200).json(checkOH);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getEstadisticasHerramientas = async (req, res) => {
    try {
        const estadisticas = await checkoutHerramientaService.getEstadisticasUso({ top: 10 });
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
