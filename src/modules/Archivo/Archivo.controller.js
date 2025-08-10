import { archivoService } from "./Archivo.service.js";
import { bucket } from "../../shared/firebase/firebase.js";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Función auxiliar para subir a Firebase
const subirAStorage = async (archivoLocal, nombreRemoto) => {
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuidv4()
    },
    contentType: "image/jpeg",
    public: true
  };

  await bucket.upload(archivoLocal, {
    destination: nombreRemoto,
    metadata
  });

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(nombreRemoto)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;

  return url;
};

// Función auxiliar para eliminar archivo de Firebase Storage
const eliminarDeStorage = async (nombreArchivo) => {
  try {
    await bucket.file(nombreArchivo).delete();
  } catch (error) {
    console.warn(`No se pudo eliminar el archivo ${nombreArchivo} del storage:`, error.message);
  }
};

// Función auxiliar para extraer el nombre del archivo desde la URL
const extraerNombreArchivo = (url) => {
  const match = url.match(/\/o\/(.+?)\?/);
  return match ? decodeURIComponent(match[1]) : null;
};

// CREATE - Subir archivo (función existente)
export const subirArchivo = async (req, res) => {
  try {
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ error: "No se proporcionó un archivo." });
    }

    // Ruta temporal del archivo y del thumbnail
    const rutaThumbnailLocal = `temp/thumb-${archivo.filename}`;

    // Generar thumbnail local
    await sharp(archivo.path)
      .resize(200)
      .toFile(rutaThumbnailLocal);

    // Subir original y thumbnail a Firebase
    const nombreRemoto = `archivos/${archivo.filename}`;
    const nombreThumbnailRemoto = `thumbnails/thumb-${archivo.filename}`;

    const urlOriginal = await subirAStorage(archivo.path, nombreRemoto);
    const urlThumbnail = await subirAStorage(rutaThumbnailLocal, nombreThumbnailRemoto);

    // Limpiar archivos temporales locales
    await fs.unlink(archivo.path);
    await fs.unlink(rutaThumbnailLocal);

    // Registrar en BD
    const nuevoArchivo = await archivoService.create({
      nombre: archivo.originalname,
      ruta: urlOriginal,
      thumbnail: urlThumbnail
    });

    res.status(201).json(nuevoArchivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
};

// READ - Obtener todos los archivos
export const obtenerArchivos = async (req, res) => {
  try {
    const archivos = await archivoService.getAll();
    res.status(200).json(archivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los archivos" });
  }
};

// READ - Obtener archivo por ID
export const obtenerArchivoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await archivoService.getById(id);

    if (!archivo) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    res.status(200).json(archivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el archivo" });
  }
};

// UPDATE - Actualizar archivo (solo metadata, no el archivo físico)
export const actualizarArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Verificar que el archivo existe
    const archivoExistente = await archivoService.getById(id);
    if (!archivoExistente) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Actualizar solo el nombre (metadata)
    const archivoActualizado = await archivoService.update(id, {
      nombre: nombre || archivoExistente.nombre
    });

    res.status(200).json(archivoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el archivo" });
  }
};

// UPDATE - Reemplazar archivo completo
export const reemplazarArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevoArchivo = req.file;

    if (!nuevoArchivo) {
      return res.status(400).json({ error: "No se proporcionó un archivo." });
    }

    // Verificar que el archivo existe en la BD
    const archivoExistente = await archivoService.getById(id);
    if (!archivoExistente) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Eliminar archivos anteriores del storage
    const nombreArchivoAnterior = extraerNombreArchivo(archivoExistente.ruta);
    const nombreThumbnailAnterior = extraerNombreArchivo(archivoExistente.thumbnail);

    if (nombreArchivoAnterior) await eliminarDeStorage(nombreArchivoAnterior);
    if (nombreThumbnailAnterior) await eliminarDeStorage(nombreThumbnailAnterior);

    // Generar thumbnail para el nuevo archivo
    const rutaThumbnailLocal = `temp/thumb-${nuevoArchivo.filename}`;
    await sharp(nuevoArchivo.path)
      .resize(200)
      .toFile(rutaThumbnailLocal);

    // Subir nuevo archivo y thumbnail
    const nombreRemoto = `archivos/${nuevoArchivo.filename}`;
    const nombreThumbnailRemoto = `thumbnails/thumb-${nuevoArchivo.filename}`;

    const urlOriginal = await subirAStorage(nuevoArchivo.path, nombreRemoto);
    const urlThumbnail = await subirAStorage(rutaThumbnailLocal, nombreThumbnailRemoto);

    // Limpiar archivos temporales
    await fs.unlink(nuevoArchivo.path);
    await fs.unlink(rutaThumbnailLocal);

    // Actualizar en la BD
    const archivoActualizado = await archivoService.update(id, {
      nombre: nuevoArchivo.originalname,
      ruta: urlOriginal,
      thumbnail: urlThumbnail
    });

    res.status(200).json(archivoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al reemplazar el archivo" });
  }
};

// DELETE - Eliminar archivo
export const eliminarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el archivo existe
    const archivo = await archivoService.getById(id);
    if (!archivo) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Extraer nombres de archivos para eliminarlos del storage
    const nombreArchivo = extraerNombreArchivo(archivo.ruta);
    const nombreThumbnail = extraerNombreArchivo(archivo.thumbnail);

    // Eliminar archivos del storage
    if (nombreArchivo) await eliminarDeStorage(nombreArchivo);
    if (nombreThumbnail) await eliminarDeStorage(nombreThumbnail);

    // Eliminar registro de la BD
    await archivoService.delete(id);

    res.status(200).json({ mensaje: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el archivo" });
  }
};

// DELETE - Eliminar múltiples archivos
export const eliminarMultiplesArchivos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Se debe proporcionar un array de IDs" });
    }

    const resultados = {
      eliminados: [],
      errores: []
    };

    for (const id of ids) {
      try {
        const archivo = await archivoService.getById(id);
        if (!archivo) {
          resultados.errores.push({ id, error: "Archivo no encontrado" });
          continue;
        }

        // Eliminar archivos del storage
        const nombreArchivo = extraerNombreArchivo(archivo.ruta);
        const nombreThumbnail = extraerNombreArchivo(archivo.thumbnail);

        if (nombreArchivo) await eliminarDeStorage(nombreArchivo);
        if (nombreThumbnail) await eliminarDeStorage(nombreThumbnail);

        // Eliminar de la BD
        await archivoService.delete(id);
        resultados.eliminados.push(id);
      } catch (error) {
        resultados.errores.push({ id, error: error.message });
      }
    }

    res.status(200).json({
      mensaje: `Se eliminaron ${resultados.eliminados.length} archivos`,
      resultados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar los archivos" });
  }
};