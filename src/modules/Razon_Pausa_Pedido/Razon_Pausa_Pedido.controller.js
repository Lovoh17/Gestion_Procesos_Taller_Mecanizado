<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
import { razonPausaPedidoService } from "./Razon_Pausa_Pedido.service.js";
=======
import { razonesPausaPedidoService } from "./Razones_Pausa_Pedido.service.js";
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js

export const crearRazonesPP = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
        const nuevo = await razonPausaPedidoService.create({
=======
        const nuevo = await razonesPausaPedidoService.create({
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js
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
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
        const RazonesPP = await razonPausaPedidoService.getById(id);
=======
        const RazonesPP = await razonesPausaPedidoService.getById(id);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js
        res.status(200).json(RazonesPP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const obtenerRazonesPP = async (req, res) => {
    try {
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
        const RazonesPP = await razonPausaPedidoService.getAll();
=======
        const RazonesPP = await razonesPausaPedidoService.getAll();
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js
        res.status(200).json(RazonesPP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const actualizarRazonesPP = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion} = req.body;
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
        const RazonesPPActualizada = await razonPausaPedidoService.update(id, {
=======
        const RazonesPPActualizada = await razonesPausaPedidoService.update(id, {
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js
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
<<<<<<< HEAD:src/modules/Razon_Pausa_Pedido/Razon_Pausa_Pedido.controller.js
        await razonPausaPedidoService.delete(id);
=======
        await razonesPausaPedidoService.delete(id);
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.controller.js
        res.status(200).json({ message: "Razon eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}