import { archivoService } from "./Archivo.service.js";
import { bucket } from "../../shared/firebase/firebase.js";

import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import { promisify } from "util";

import sharp from "sharp";

const execAsync = promisify(exec);

// Variables de entorno para configuración
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const USE_EXTERNAL_SERVICES = process.env.USE_EXTERNAL_THUMBNAIL_SERVICES === 'true';
const THUMBNAIL_SERVICE_URL = process.env.THUMBNAIL_SERVICE_URL;

// OPCIÓN 1: Usar servicios externos para generar thumbnails
const generarThumbnailExterno = async (rutaArchivo, rutaThumbnail, tipoMime) => {
  try {
    // Ejemplo usando un servicio como CloudConvert o similar
    // Aquí usarías una API externa para generar thumbnails
    
    if (THUMBNAIL_SERVICE_URL) {
      const FormData = require('form-data');
      const axios = require('axios');
      
      const form = new FormData();
      form.append('file', fs.createReadStream(rutaArchivo));
      form.append('output_format', 'jpeg');
      form.append('width', '200');
      form.append('height', '200');
      
      const response = await axios.post(THUMBNAIL_SERVICE_URL, form, {
        headers: form.getHeaders(),
        responseType: 'stream'
      });
      
      const writer = fs.createWriteStream(rutaThumbnail);
      response.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(rutaThumbnail));
        writer.on('error', reject);
      });
    }
    
    throw new Error('Servicio externo no configurado');
  } catch (error) {
    console.error("Error con servicio externo:", error);
    throw error;
  }
};

// OPCIÓN 2: Usar librerías JavaScript puras (sin dependencias del sistema)
const generarThumbnailPurejs = async (rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo) => {
  try {
    const ext = path.extname(nombreArchivo).toLowerCase();
    
    // Para PDFs - usar pdf-lib o pdf-parse (librerías JS puras)
    if (ext === '.pdf') {
      try {
        // Opción A: pdf-lib (más robusta)
        const { PDFDocument } = await import('pdf-lib');
        const pdfBytes = await fs.readFile(rutaArchivo);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        if (pdfDoc.getPageCount() > 0) {
          // Para PDF usamos canvas para renderizar
          const Canvas = await import('canvas');
          const canvas = Canvas.createCanvas(200, 200);
          const ctx = canvas.getContext('2d');
          
          // Dibujar representación básica del PDF
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 200, 200);
          ctx.strokeStyle = '#cccccc';
          ctx.strokeRect(10, 10, 180, 180);
          ctx.fillStyle = '#666666';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('PDF', 100, 120);
          ctx.font = '12px Arial';
          ctx.fillText(`${pdfDoc.getPageCount()} páginas`, 100, 150);
          
          const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
          await fs.writeFile(rutaThumbnail, buffer);
          
          return rutaThumbnail;
        }
      } catch (pdfError) {
        console.log("Error con pdf-lib, usando fallback");
      }
    }
    
    // Para imágenes - usar Sharp (funciona en la mayoría de servidores)
    if (tipoMime.startsWith('image/')) {
      await sharp(rutaArchivo)
        .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(rutaThumbnail);
      return rutaThumbnail;
    }
    
    // Para documentos de Office - usar officeparser o mammoth
    if (ext === '.docx') {
      try {
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({ path: rutaArchivo });
        const texto = result.value.substring(0, 200) + '...';
        
        // Crear thumbnail con el texto
        const Canvas = await import('canvas');
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 200, 200);
        ctx.strokeStyle = '#4285f4';
        ctx.strokeRect(5, 5, 190, 190);
        ctx.fillStyle = '#4285f4';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DOCX', 100, 30);
        
        // Agregar preview del texto
        ctx.fillStyle = '#333333';
        ctx.font = '8px Arial';
        ctx.textAlign = 'left';
        const lines = wrapText(ctx, texto, 10, 180);
        lines.slice(0, 15).forEach((line, index) => {
          ctx.fillText(line, 15, 50 + (index * 10));
        });
        
        const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
        await fs.writeFile(rutaThumbnail, buffer);
        
        return rutaThumbnail;
      } catch (docError) {
        console.log("Error procesando DOCX:", docError);
      }
    }
    
    // Fallback: thumbnail genérico usando Canvas
    return await generarThumbnailGenericoPuro(rutaThumbnail, tipoMime, nombreArchivo);
    
  } catch (error) {
    console.error("Error en generarThumbnailPurejs:", error);
    throw error;
  }
};

// Función auxiliar para envolver texto
const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

// Generar thumbnail genérico usando Canvas (JS puro)
const generarThumbnailGenericoPuro = async (rutaThumbnail, tipoMime, nombreArchivo) => {
  try {
    const Canvas = await import('canvas');
    const canvas = Canvas.createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    
    const extension = path.extname(nombreArchivo).substring(1).toUpperCase() || 'FILE';
    
    // Colores según tipo de archivo
    const colores = {
      'PDF': '#FF6B6B',
      'DOC': '#4285F4',
      'DOCX': '#4285F4',
      'XLS': '#0F9D58',
      'XLSX': '#0F9D58',
      'PPT': '#FF6D01',
      'PPTX': '#FF6D01',
      'TXT': '#9E9E9E',
      'default': '#607D8B'
    };
    
    const color = colores[extension] || colores.default;
    
    // Fondo
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 200, 200);
    
    // Icono del archivo
    ctx.fillStyle = color;
    ctx.fillRect(50, 40, 100, 120);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(55, 45, 90, 110);
    
    // Líneas simulando contenido
    ctx.fillStyle = '#cccccc';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(65, 55 + (i * 12), 70, 2);
    }
    
    // Texto de extensión
    ctx.fillStyle = color;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(extension, 100, 185);
    
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
    await fs.writeFile(rutaThumbnail, buffer);
    
    return rutaThumbnail;
  } catch (error) {
    console.error("Error generando thumbnail genérico:", error);
    throw error;
  }
};

// Verificar disponibilidad de herramientas del sistema
const verificarHerramientasDisponibles = async () => {
  const herramientas = [];
  
  if (IS_PRODUCTION) {
    console.log("Modo producción: omitiendo verificación de herramientas del sistema");
    return herramientas;
  }
  
  try {
    await execAsync("pdftoppm -h");
    herramientas.push("pdftoppm (poppler-utils)");
  } catch (error) {
    console.log("pdftoppm no disponible");
  }
  
  try {
    await execAsync("convert -version");
    herramientas.push("convert (ImageMagick)");
  } catch (error) {
    console.log("ImageMagick no disponible");
  }
  
  console.log("Herramientas disponibles:", herramientas);
  return herramientas;
};

// FUNCIÓN PRINCIPAL: Generar thumbnail con fallbacks inteligentes
const generarThumbnail = async (rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo) => {
  try {
    // En producción, usar métodos que no dependan del sistema
    if (IS_PRODUCTION || USE_EXTERNAL_SERVICES) {
      console.log("Usando métodos compatibles con producción...");
      
      // Intentar servicio externo primero
      if (USE_EXTERNAL_SERVICES) {
        try {
          return await generarThumbnailExterno(rutaArchivo, rutaThumbnail, tipoMime);
        } catch (error) {
          console.log("Servicio externo falló, usando métodos locales...");
        }
      }
      
      // Usar librerías JavaScript puras
      return await generarThumbnailPurejs(rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo);
    }
    
    // En desarrollo, usar herramientas del sistema si están disponibles
    const herramientas = await verificarHerramientasDisponibles();
    
    if (herramientas.length > 0) {
      // Usar el método original con herramientas del sistema
      return await generarThumbnailSistema(rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo);
    } else {
      // Fallback a métodos JavaScript puros
      return await generarThumbnailPurejs(rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo);
    }
    
  } catch (error) {
    console.error("Error generando thumbnail:", error);
    // Último fallback: thumbnail básico
    return await generarThumbnailGenericoPuro(rutaThumbnail, tipoMime, nombreArchivo);
  }
};

// Método original para desarrollo (con herramientas del sistema)
const generarThumbnailSistema = async (rutaArchivo, rutaThumbnail, tipoMime, nombreArchivo) => {
  const ext = path.extname(nombreArchivo).toLowerCase();
  
  if (ext === ".pdf") {
    try {
      const outputDir = path.dirname(rutaThumbnail);
      const outputName = path.basename(rutaThumbnail, path.extname(rutaThumbnail));
      const comando = `pdftoppm -png -f 1 -l 1 -scale-to 200 "${rutaArchivo}" "${path.join(outputDir, outputName)}"`;
      
      await execAsync(comando);
      const archivoGenerado = `${path.join(outputDir, outputName)}-1.png`;
      
      await sharp(archivoGenerado)
        .jpeg({ quality: 85 })
        .toFile(rutaThumbnail);
      
      await fs.unlink(archivoGenerado);
      return rutaThumbnail;
    } catch (error) {
      const comando = `convert "${rutaArchivo}[0]" -thumbnail 200x200 -background white -alpha remove "${rutaThumbnail}"`;
      await execAsync(comando);
      return rutaThumbnail;
    }
  }
  
  if (tipoMime.startsWith("image/")) {
    await sharp(rutaArchivo)
      .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(rutaThumbnail);
    return rutaThumbnail;
  }
  
  return await generarThumbnailGenericoPuro(rutaThumbnail, tipoMime, nombreArchivo);
};

// Resto de funciones auxiliares igual...
const subirAStorage = async (archivoLocal, nombreRemoto, contentType) => {
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuidv4()
    },
    contentType,
    public: true
  };

  await bucket.upload(archivoLocal, {
    destination: nombreRemoto,
    metadata
  });

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(nombreRemoto)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;
  return url;
};

const eliminarDeStorage = async (nombreArchivo) => {
  try {
    await bucket.file(nombreArchivo).delete();
  } catch (error) {
    console.warn(`No se pudo eliminar el archivo ${nombreArchivo} del storage:`, error.message);
  }
};

const extraerNombreArchivo = (url) => {
  const match = url.match(/\/o\/(.+?)\?/);
  return match ? decodeURIComponent(match[1]) : null;
};

// CREATE - Subir archivo (resto igual pero usando la nueva función generarThumbnail)
export const subirArchivo = async (req, res) => {
  try {
    const archivo = req.file;
    if (!archivo) {
      return res.status(400).json({ error: "No se proporcionó un archivo." });
    }

    const rutaThumbnailLocal = `temp/thumb-${archivo.filename}.jpeg`;
    
    try {
      await generarThumbnail(archivo.path, rutaThumbnailLocal, archivo.mimetype, archivo.originalname);
      
      const urlOriginal = await subirAStorage(archivo.path, `archivos/${archivo.filename}`, archivo.mimetype);
      const urlThumbnail = await subirAStorage(rutaThumbnailLocal, `thumbnails/thumb-${archivo.filename}`, "image/jpeg");

      await fs.unlink(archivo.path);
      await fs.unlink(rutaThumbnailLocal);

      const nuevoArchivo = await archivoService.create({
        nombre: archivo.originalname,
        ruta: urlOriginal,
        thumbnail: urlThumbnail
      });

      return res.status(201).json(nuevoArchivo);
      
    } catch (thumbnailError) {
      console.error("Error generando thumbnail:", thumbnailError);
      
      // Thumbnail de emergencia con datos base64
      const thumbnailEmergencia = `data:image/svg+xml;base64,${Buffer.from(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#f5f5f5" stroke="#ddd"/>
          <text x="100" y="100" text-anchor="middle" font-size="14" fill="#666">
            ${path.extname(archivo.originalname).substring(1).toUpperCase() || 'FILE'}
          </text>
          <text x="100" y="120" text-anchor="middle" font-size="10" fill="#999">Sin preview</text>
        </svg>
      `).toString('base64')}`;
      
      const urlOriginal = await subirAStorage(archivo.path, `archivos/${archivo.filename}`, archivo.mimetype);
      await fs.unlink(archivo.path);

      const nuevoArchivo = await archivoService.create({
        nombre: archivo.originalname,
        ruta: urlOriginal,
        thumbnail: thumbnailEmergencia
      });

      return res.status(201).json(nuevoArchivo);
    }

  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return res.status(500).json({ error: "Error al subir el archivo: " + error.message });
  }
};

// Resto de funciones igual que antes...
export const reemplazarArchivo = async (req, res) => {
  // ... implementación similar
};

export const obtenerArchivos = async (req, res) => {
  try {
    const archivos = await archivoService.getAll();
    res.status(200).json(archivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los archivos" });
  }
};

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

export const actualizarArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const archivoExistente = await archivoService.getById(id);
    if (!archivoExistente) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const archivoActualizado = await archivoService.update(id, {
      nombre: nombre || archivoExistente.nombre
    });

    res.status(200).json(archivoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el archivo" });
  }
};

export const eliminarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    const archivo = await archivoService.getById(id);
    if (!archivo) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const nombreArchivo = extraerNombreArchivo(archivo.ruta);
    const nombreThumbnail = extraerNombreArchivo(archivo.thumbnail);

    if (nombreArchivo) await eliminarDeStorage(nombreArchivo);
    if (nombreThumbnail) await eliminarDeStorage(nombreThumbnail);

    await archivoService.delete(id);

    res.status(200).json({ mensaje: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el archivo" });
  }
};

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

        const nombreArchivo = extraerNombreArchivo(archivo.ruta);
        const nombreThumbnail = extraerNombreArchivo(archivo.thumbnail);

        if (nombreArchivo) await eliminarDeStorage(nombreArchivo);
        if (nombreThumbnail) await eliminarDeStorage(nombreThumbnail);

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