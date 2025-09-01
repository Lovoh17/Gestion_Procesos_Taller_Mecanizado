import {Router} from "express";
import { getAdminDashboard, getCoordinadorDashboard, getOperarioDashboard, getTecnicoDashboard } from "./Dashboard.controller.js";

const router = new Router();

router.get("/dashboard/admin", getAdminDashboard);
router.get("/dashboard/coordinador", getCoordinadorDashboard);
router.get("/dashboard/operario/:id", getOperarioDashboard);
router.get("/dashboard/tecnico", getTecnicoDashboard);

export default router;
