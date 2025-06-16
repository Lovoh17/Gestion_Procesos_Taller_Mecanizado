import { tipoAlertaService } from "./Tipo_Alerta.service.js";

export const crearTiposAlerta = async (req, res) =>{
    try {
        const {nombre_alertas} = req.body;
        const nuevaTipoAlerta = await tipoAlertaService.create({
            nombre_alertas
        });
        res.status(200).json(nuevaTipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerTipoAlertaPorId = async (req,res) =>{
    try {
        const {id} = req.params;
        const TipoAlerta = await tipoAlertaService.getById(id);
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}



export const obtenerTipoAlerta = async (req, res) =>{
    try {
        const TipoAlerta = await tipoAlertaService.getAll();
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export const actualizarTipoAlerta = async (req, res) =>{
    try {
        const { id } = req.params;
        const { nombre_alertas }= req.body;
        const TipoAlerta = await tipoAlertaService.update(id, {
            nombre_alertas
        });
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export const eliminarTipoAlerta = async (req, res) =>{
    try {
        const { id }= req.params;
        await tipoAlertaService.delete(id);
        res.status(200).json({message: "Tipo Alerta " + id+ " eliminarla"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}