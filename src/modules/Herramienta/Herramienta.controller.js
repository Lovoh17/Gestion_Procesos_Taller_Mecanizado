import { HerramientaService } from "./Herramienta.service.js";

export const crearHerramienta = async (req, res) => {
    try {
        const { nombre, tipo_herramienta_id, modelo, fabricante, numero_serie, codigo_inventario, estado_herramienta_id, vida_util_hora, hora_uso_actual, zonas_trabajo_id, fecha_adquisicion, costo_adquisicion, valor_actual, especificaciones_tecnicas, imagen_ruta, fecha_ultimo_mantenimiento, fecha_proximo_mantenimiento, notas, timestamps } = req.body;
        const nuevaHerramienta = await HerramientaService.create({
            nombre, 
            tipo_herramienta_id, 
            modelo, 
            fabricante, 
            numero_serie, 
            codigo_inventario, 
            estado_herramienta_id, 
            vida_util_hora, 
            hora_uso_actual, 
            zonas_trabajo_id, 
            fecha_adquisicion, 
            costo_adquisicion, 
            valor_actual, 
            especificaciones_tecnicas, 
            imagen_ruta, 
            fecha_ultimo_mantenimiento, 
            fecha_proximo_mantenimiento, 
            notas, 
            timestamps
        });
        res.status(200).json(nuevaHerramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerHerramientaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const herramienta = await HerramientaService.getById(id);
        res.status(200).json(herramienta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerHerramientas = async (req, res) => {
    try {
        const herramientas = await HerramientaService.getAll();
        res.status(200).json(herramientas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo_herramienta_id, modelo, fabricante, numero_serie, codigo_inventario, estado_herramienta_id, vida_util_hora, hora_uso_actual, zonas_trabajo_id, fecha_adquisicion, costo_adquisicion, valor_actual, especificaciones_tecnicas, imagen_ruta, fecha_ultimo_mantenimiento, fecha_proximo_mantenimiento, notas, timestamps } = req.body;
        const herramientaActualizada = await HerramientaService.update(id, {
            nombre, 
            tipo_herramienta_id, 
            modelo, 
            fabricante, 
            numero_serie, 
            codigo_inventario, 
            estado_herramienta_id, 
            vida_util_hora, 
            hora_uso_actual, 
            zonas_trabajo_id, 
            fecha_adquisicion, 
            costo_adquisicion, 
            valor_actual, 
            especificaciones_tecnicas, 
            imagen_ruta, 
            fecha_ultimo_mantenimiento, 
            fecha_proximo_mantenimiento, 
            notas, 
            timestamps
        });
        res.status(200).json(herramientaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        await HerramientaService.delete(id);
        res.status(200).json({ message: "Herramienta eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
