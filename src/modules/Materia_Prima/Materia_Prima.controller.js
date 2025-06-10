import { MateriaPrimaService } from "./Materia_Prima.service.js";

export const crearMateriaPrima = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps  } = req.body;
        const nuevaMateriaPrima = await MateriaPrimaService.create({
            codigo, 
            nombre, 
            descripcion, 
            tipo_materia_prima_id, 
            unidad_base_id, 
            stock_minimo, 
            stock_maximo, 
            unidades_completas, 
            fracciones, 
            stock_total, 
            fraccion_unidad_id, 
            permite_fraccion, 
            pertenece_a_stock_id, 
            costo_unitario, 
            proveedor_principal, 
            tiempo_reposicion, 
            es_controlado, 
            timestamps
        });
        res.status(200).json(nuevaMateriaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerMateriaPrimaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const materiaPrima = await MateriaPrimaService.getById(id);
        res.status(200).json(materiaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerMateriasPrima = async (req, res) => {
    try {
        const materiasPrima = await MateriaPrimaService.getAll();
        res.status(200).json(materiasPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarMateriaPrima = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps } = req.body;
        const materiaPrimaActualizada = await MateriaPrimaService.update(id, {
            codigo, 
            nombre, 
            descripcion, 
            tipo_materia_prima_id, 
            unidad_base_id, 
            stock_minimo, 
            stock_maximo, 
            unidades_completas, 
            fracciones, 
            stock_total, 
            fraccion_unidad_id, 
            permite_fraccion, 
            pertenece_a_stock_id, 
            costo_unitario, 
            proveedor_principal, 
            tiempo_reposicion, 
            es_controlado, 
            timestamps
        });
        res.status(200).json(materiaPrimaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarMateriaPrima = async (req, res) => {
    try {
        const { id } = req.params;
        await MateriaPrimaService.delete(id);
        res.status(200).json({ message: "Materia Prima eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
