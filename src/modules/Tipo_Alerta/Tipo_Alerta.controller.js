<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js
import { tipoAlertaService } from "./Tipo_Alerta.service.js";
=======
import { tiposAlertasService } from "./Tipos_Alertas.service.js";
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js

export const crearTiposAlerta = async (req, res) =>{
    try {
        const {nombre_alertas} = req.body;
<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js
        const nuevaTipoAlerta = await tipoAlertaService.create({
=======
        const nuevaTipoAlerta = await tiposAlertasService.create({
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js
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
<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js
        const TipoAlerta = await tipoAlertaService.getById(id);
=======
        const TipoAlerta = await tiposAlertasService.getById(id);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js


export const obtenerTipoAlerta = async (req, res) =>{
    try {
        const TipoAlerta = await tipoAlertaService.getAll();
=======
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
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js
        res.status(200).json(TipoAlerta);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export const actualizarTipoAlerta = async (req, res) =>{
    try {
        const { id } = req.params;
        const { nombre_alertas }= req.body;
<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js
        const TipoAlerta = await tipoAlertaService.update(id, {
=======
        const TipoAlerta = await tiposAlertasService.update(id, {
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js
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
<<<<<<< HEAD:src/modules/Tipo_Alerta/Tipo_Alerta.controller.js
        await tipoAlertaService.delete(id);
=======
        await tiposAlertasService.delete(id);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Tipos_Alertas/Tipos_Alertas.controller.js
        res.status(200).json({message: "Tipo Alerta " + id+ " eliminarla"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}