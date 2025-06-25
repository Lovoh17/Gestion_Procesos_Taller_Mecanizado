import { Router } from "express";
import { login } from "./Auth.controller.js";

const router = new Router();

router.post("/login", login);

export default router;