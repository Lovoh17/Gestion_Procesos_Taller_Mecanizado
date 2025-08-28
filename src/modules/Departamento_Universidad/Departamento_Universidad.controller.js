<<<<<<< HEAD:src/modules/Departamento_Universidad/Departamento_Universidad.controller.js
import { departamentoUniversidadService } from "./Departamento_Universidad.service.js";

export const crearDepartamentoU = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoDepartamento = await departamentoUniversidadService.create({
            nombre, 
=======
import { departamentoUniversidadService } from "./Departamentos_Universidad.service.js";

export const crearDepartamentoU = async (req, res) => {
    try {
        const { nombre, descripcion} = req.body;
        const nuevoDepartamento = await departamentoUniversidadService.create({
            nombre
        });
        res.status(200).json(nuevoDepartamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerDepartamentoUPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const departamentoU = await departamentoUniversidadService.getById(id);
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerDepartamentoU = async (req, res) => {
    try {
        const departamentoU = await departamentoUniversidadService.getAll();
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarDepartamentoU = async (req, res) => {
    try {
        const { id } = req.params;
<<<<<<< HEAD:src/modules/Departamento_Universidad/Departamento_Universidad.controller.js
        const { nombre } = req.body;
        const departamentoU = await departamentoUniversidadService.update(id, {
            nombre
=======
        const { nombre, descripcion } = req.body;
        const departamentoU = await departamentoUniversidadService.update(id, {
            nombre,
            descripcion
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Departamentos_Universidad/Departamentos_Universidad.controller.js
        });
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarDepartamentoU = async (req, res) => {
    try {
        const { id } = req.params;
        await departamentoUniversidadService.delete(id);
        res.status(200).json({ message: "Departamento U eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
