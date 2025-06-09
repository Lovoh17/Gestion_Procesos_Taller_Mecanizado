import { RazonesPausaPedidoService } from "./Razones_Pausa_Pedido.service.js";

export const crearRazonesPP = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevo = await RazonesPausaPedidoService.create({
            nombre,
            descripcion,
            
        });
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const obtenerRazonesPPPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const RazonesPP = await RazonesPausaPedidoService.getById(id);
        res.status(200).json(RazonesPP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerRazonesPP = async (req, res) => {
    try {
        const RazonesPP = await RazonesPausaPedidoService.getAll();
        res.status(200).json(RazonesPP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarRazonesPP = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion} = req.body;
        const RazonesPPActualizada = await RazonesPausaPedidoService.update(id, {
            nombre,
            descripcion,
            
        });
        res.status(200).json(RazonesPPActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const eliminarRazonesPP = async (req, res) => {
    try {
        const { id } = req.params;
        await RazonesPausaPedidoService.delete(id);
        res.status(200).json({ message: "Razon eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}