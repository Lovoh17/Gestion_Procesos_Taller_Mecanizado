import { Router } from "express";
import { login, loginfalse } from "./Auth.controller.js";

const router = new Router();

router.post("/login", login);
router.post('/auth/login', loginfalse);

export default router;