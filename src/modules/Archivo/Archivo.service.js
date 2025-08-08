import { Archivo } from "./Archivo.js";

class ArchivoService {
  async create(data) {
    try {
      return await Archivo.create(data);
    } catch (error) {
      throw new Error("Error al guardar el archivo: " + error.message);
    }
  }

  async getAll() {
    try {
      return await Archivo.findAll();
    } catch (error) {
      throw new Error("Error al obtener archivos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const archivo = await Archivo.findByPk(id);
      if (!archivo) throw new Error("Archivo no encontrado");
      return archivo;
    } catch (error) {
      throw new Error("Error al buscar el archivo: " + error.message);
    }
  }
  async update(id, data){
    try {
        const archivo = await Archivo.findByPk(id);
        if (!archivo) throw new Error("Archivo no encontrado");
        await archivo.update(data);
        return archivo;
    } catch (error) {
        throw new Error("Error al actualizar el archivo: " + error.message);
    }
  }
  async delete(id){
    try {
        const archivo = await Archivo.findByPk(id);
        if (!archivo) throw new Error("Archivo no encontrado");
        await archivo.destroy();
        return {message: "Archivo eliminado"};
    } catch (error) {
        throw new Error("Error al eliminar el archivo: " + error.message);
    }
  }
}

export const archivoService = new ArchivoService();
