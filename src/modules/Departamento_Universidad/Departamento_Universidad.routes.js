import { Router } from "express";
import {crearDepartamentoU,obtenerDepartamentoUPorId, obtenerDepartamentoU,actualizarDepartamentoU,eliminarDepartamentoU} from "./Departamento_Universidad.controller.js";

const router = new Router();

router.post("/DepartamentoUniversidad", crearDepartamentoU);
router.get("/DepartamentoUniversidad", obtenerDepartamentoU);
router.get("/DepartamentoUniversidad/:id", obtenerDepartamentoUPorId);
router.put("/DepartamentoUniversidad/:id", actualizarDepartamentoU);
router.delete("/DepartamentoUniversidad/:id", eliminarDepartamentoU);

export default router;