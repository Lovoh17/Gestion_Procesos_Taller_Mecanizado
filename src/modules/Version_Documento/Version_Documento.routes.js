import { Router } from "express";
import { getAllVersiones,getVersionById,createVersion,updateVersion,deleteVersion,createVersionWithAutoIncrement } from "./Version_Documento.controller.js";

const router = Router();

router.get("/Version_Documento", getAllVersiones);
router.get("/Version_Documento/:id", getVersionById);
router.post("/Version_Documento", createVersion);
router.put("/Version_Documento/:id", updateVersion);
router.delete("/Version_Documento/:id", deleteVersion);
router.post("/Version_Documento/auto", createVersionWithAutoIncrement);

export default router;
