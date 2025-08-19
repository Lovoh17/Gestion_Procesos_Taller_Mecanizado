import {Router} from "express";
import { getAdminDashboard, getCoordinadorDashboard } from "./Dashboard.controller.js";

const router = new Router();

router.get("/dashboard/admin", getAdminDashboard);
router.get("/dashboard/coordinador", getCoordinadorDashboard);

export default router;
