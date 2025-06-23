import { materiaPrimaService } from "./Materia_Prima.service.js";

export const crearMateriaPrima = async (req, res) => {
    try {
<<<<<<< HEAD
        const { codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps  } = req.body;
        const nuevaMateriaPrima = await materiaPrimaService.create({
=======
        // 1. Extracción y validación de campos requeridos
        const { 
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
            codigo, 
            nombre, 
            tipo_materia_prima_id, 
            unidad_base_id, 
            stock_minimo,
            stock_maximo,
            costo_unitario,
        } = req.body;

        // 2. Validación de campos obligatorio
        const camposRequeridos = [
            'codigo', 
            'nombre', 
            'tipo_materia_prima_id', 
            'unidad_base_id',
            'stock_minimo',
            'stock_maximo',
            'costo_unitario'
        ];

        const faltantes = camposRequeridos.filter(campo => !req.body[campo] && req.body[campo] !== 0);

        if (faltantes.length > 0) {
            return res.status(400).json({ 
                error: 'Campos requeridos faltantes',
                camposFaltantes: faltantes
            });
        }

        // 3. Validación de valores numéricos
        if (stock_minimo < 0 || stock_maximo < 0 || costo_unitario < 0) {
            return res.status(400).json({ 
                error: 'Los valores numéricos no pueden ser negativos',
                detalles: {
                    stock_minimo,
                    stock_maximo,
                    costo_unitario
                }
            });
        }

        if (stock_maximo <= stock_minimo) {
            return res.status(400).json({ 
                error: 'El stock máximo debe ser mayor al stock mínimo',
                detalles: {
                    stock_minimo,
                    stock_maximo
                }
            });
        }

        // 4. Validación de código único
        const existeCodigo = await materiaPrimaService.verificarCodigoExistente(codigo);
        if (existeCodigo) {
            return res.status(400).json({ 
                error: 'El código ya está en uso',
                codigo
            });
        }

        // 5. Creación del objeto con valores por defecto
        const materiaPrimaData = {
            codigo,
            nombre,
            descripcion: otrosCampos.descripcion || '',
            tipo_materia_prima_id,
            unidad_base_id,
            stock_minimo,
            stock_maximo,
            unidades_completas: otrosCampos.unidades_completas || 0,
            fracciones: otrosCampos.fracciones || 0,
            stock_total: otrosCampos.stock_total || 0,
            fraccion_unidad_id: otrosCampos.fraccion_unidad_id || null,
            permite_fraccion: otrosCampos.permite_fraccion || false,
            pertenece_a_stock_id: otrosCampos.pertenece_a_stock_id || null,
            costo_unitario,
            proveedor_principal: otrosCampos.proveedor_principal || '',
            tiempo_reposicion: otrosCampos.tiempo_reposicion || 0,
            es_controlado: otrosCampos.es_controlado || false,
            timestamps: otrosCampos.timestamps || new Date()
        };

        // 6. Creación en la base de datos
        const nuevaMateriaPrima = await materiaPrimaService.create(materiaPrimaData);

        // 7. Respuesta exitosa
        res.status(201).json({
            success: true,
            data: nuevaMateriaPrima,
            message: 'Materia prima creada exitosamente'
        });

    } catch (error) {
        console.error('Error al crear materia prima:', error);
        
        // Manejo específico de errores de base de datos
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ 
                error: 'Violación de restricción única',
                detalles: error.errors.map(err => err.message)
            });
        }

        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

export const obtenerMateriaPrimaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const materiaPrima = await materiaPrimaService.getById(id);
        res.status(200).json(materiaPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const obtenerMateriasPrima = async (req, res) => {
    try {
        const materiasPrima = await materiaPrimaService.getAll();
        res.status(200).json(materiasPrima);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarMateriaPrima = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps } = req.body;
        const materiaPrimaActualizada = await materiaPrimaService.update(id, {
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
        await materiaPrimaService.delete(id);
        res.status(200).json({ message: "Materia Prima eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
