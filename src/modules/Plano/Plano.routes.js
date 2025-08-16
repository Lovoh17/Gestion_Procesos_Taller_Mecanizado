import { Router } from "express";
import {crearPlano, obtenerPlanos, obtenerPlanoPorId, actualizarPlano, eliminarPlano} from "./Plano.controller.js";

const router = Router();

router.post("/Plano", crearPlano);
router.get("/Plano", obtenerPlanos);
router.get("/Plano/:id", obtenerPlanoPorId);
router.put("/Plano/:id", actualizarPlano);
router.delete("/Plano/:id", eliminarPlano);

export default router;