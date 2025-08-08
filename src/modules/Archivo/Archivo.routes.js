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

const router = Router();

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Solo se permiten imágenes"), false);
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