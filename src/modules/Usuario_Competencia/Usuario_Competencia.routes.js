import Router from 'express';

import {crearUsuarioCompetencia, obtenerUsuarioCompetencia, obtenerUsuarioCompetenciaPorId, actualizarUsuarioCompetencia, eliminarUsuarioCompetencia} from './Usuario_Competencia.controller.js';

const router = new Router();

router.post("/UsuarioCompetencia", crearUsuarioCompetencia);
router.get("/UsuarioCompetencia", obtenerUsuarioCompetencia);
router.get("/UsuarioCompetencia/:id", obtenerUsuarioCompetenciaPorId);
router.put("/UsuarioCompetencia/:id", actualizarUsuarioCompetencia);
router.delete("/UsuarioCompetencia/:id", eliminarUsuarioCompetencia);

export default router;