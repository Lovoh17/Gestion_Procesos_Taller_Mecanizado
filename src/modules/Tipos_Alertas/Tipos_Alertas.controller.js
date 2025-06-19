import { tiposAlertasService } from "./Tipos_Alertas.service.js";

export const crearTiposAlerta = async (req, res) =>{
    try {
        const {nombre_alertas} = req.body;
        const nuevaTipoAlerta = await tiposAlertasService.create({
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
        const TipoAlerta = await tiposAlertasService.getById(id);
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerTipoAlertaPorNombre = async (req,res) =>{
    try {
        const { nombre_alertas } = req.params;
        const TipoAlerta = await tiposAlertasService.getByName(nombre_alertas);
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const obtenerTipoAlerta = async (req, res) =>{
    try {
        const TipoAlerta = await tiposAlertasService.getAll();
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export const actualizarTipoAlerta = async (req, res) =>{
    try {
        const { id } = req.params;
        const { nombre_alertas }= req.body;
        const TipoAlerta = await tiposAlertasService.update(id, {
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
        await tiposAlertasService.delete(id);
        res.status(200).json({message: "Tipo Alerta " + id+ " eliminarla"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}