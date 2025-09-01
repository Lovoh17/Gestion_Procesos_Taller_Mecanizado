import { Router } from "express";
import {createReservaHerramienta,getAllReservasHerramienta,getReservaHerramientaById,updateReservaHerramienta,deleteReservaHerramienta} from "./Reserva_Herramienta.controller.js"

const router = new Router();

router.post("/ReservaHerramienta", createReservaHerramienta);
router.get("/ReservaHerramienta", getAllReservasHerramienta);
router.get("/ReservaHerramienta/:id", getReservaHerramientaById);
router.put("/ReservaHerramienta/:id", updateReservaHerramienta);
router.delete("/ReservaHerramienta/:id", deleteReservaHerramienta);

export default router;