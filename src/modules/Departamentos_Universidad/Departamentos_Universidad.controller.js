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
        const { nombre, descripcion } = req.body;
        const departamentoU = await departamentoUniversidadService.update(id, {
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
        await departamentoUniversidadService.delete(id);
        res.status(200).json({ message: "Departamento U eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
