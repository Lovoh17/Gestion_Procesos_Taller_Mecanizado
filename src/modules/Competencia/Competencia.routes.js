import router from "express";

import {crearCompetencia,obtenerCompetencias, obtenerCompetenciaPorId, actualizarCompetencia, eliminarCompetencia} from "./Competencia.controller.js";

const router = new router();

router.post("/Competencia", crearCompetencia);
router.get("/Competencia", obtenerCompetencias);
router.get("/Competencia/:id", obtenerCompetenciaPorId);
router.put("/Competencia/:id", actualizarCompetencia);
router.delete("/Competencia/:id", eliminarCompetencia);

export default router;