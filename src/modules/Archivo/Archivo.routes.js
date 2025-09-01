import { Router } from "express";
import multer from "multer";
import { 
  subirArchivo, 
  obtenerArchivos, 
  obtenerArchivoPorId,
  actualizarArchivo,
  reemplazarArchivo,
  eliminarArchivo,
  eliminarMultiplesArchivos
} from "./Archivo.controller.js";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const tempDir = path.join(process.cwd(), "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const router = new Router();

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",                      // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  // agrega más si quieres...
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Tipo de archivo no permitido"), false);
};
const upload = multer({ storage, fileFilter });

// ============ RUTAS CRUD ============

// CREATE - Subir nuevo archivo
router.post("/Archivo", upload.single("imagen"), subirArchivo);

// READ - Obtener todos los archivos
router.get("/Archivo", obtenerArchivos);

// READ - Obtener archivo por ID
router.get("/Archivo/:id", obtenerArchivoPorId);

// UPDATE - Actualizar metadata del archivo (solo nombre)
router.put("/Archivo/:id", actualizarArchivo);

// UPDATE - Reemplazar archivo completo
router.put("/Archivo/:id/reemplazar", upload.single("imagen"), reemplazarArchivo);

// DELETE - Eliminar archivo específico
router.delete("/Archivo/:id", eliminarArchivo);

// DELETE - Eliminar múltiples archivos
router.delete("/Archivo/multiple", eliminarMultiplesArchivos);

export default router;