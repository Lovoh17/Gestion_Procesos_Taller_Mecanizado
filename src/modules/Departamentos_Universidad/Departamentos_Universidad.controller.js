import { DepartamentoUniversidadService } from "./Departamentos_Universidad.service.js";

export const crearDepartamentoU = async (req, res) => {
    try {
        const { nombre, descripcion} = req.body;
        const nuevoDepartamento = await DepartamentoUniversidadService.create({
            nombre,
            descripcion
        });
        res.status(200).json(nuevoDepartamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerDepartamentoUPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const departamentoU = await DepartamentoUniversidadService.getById(id);
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerDepartamentoU = async (req, res) => {
    try {
        const departamentoU = await DepartamentoUniversidadService.getAll();
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarDepartamentoU = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const departamentoU = await DepartamentoUniversidadService.update(id, {
            nombre,
            descripcion
        });
        res.status(200).json(departamentoU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarDepartamentoU = async (req, res) => {
    try {
        const { id } = req.params;
        await DepartamentoUniversidadService.delete(id);
        res.status(200).json({ message: "Departamento U eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}