import { DepartamentoUniversidad} from "./Departamento_Universidad.js";

class DepartamentoUniversidadService{
    async getAll() {
            try {
                const departamento_universidad = await DepartamentoUniversidad.findAll();
                return departamento_universidad;
            } catch (error) {
                throw new Error("Error al obtener los departamentos: " + error.message);
            }
        }
    
        async getById(id) {
            try {
<<<<<<< HEAD:src/modules/Departamento_Universidad/Departamento_Universidad.service.js
                const departamento_universidad = await DepartamentoUniversidad.findByPk(id);
                if (!zonaTrabajo) {
=======
                const departamento_universidad = await Departamento_Universidad.findByPk(id);
                if (!departamento_universidad) {
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150:src/modules/Departamentos_Universidad/Departamentos_Universidad.service.js
                    throw new Error("Departamento universidad no encontrado");
                }
                return departamento_universidad;
            } catch (error) {
                throw new Error("Error al obtener el departamento universitario: " + error.message);
            }
        }
    
        async create(data) {
            try {
                const nuevoDepartamento = await DepartamentoUniversidad.create(data);
                return nuevoDepartamento;
            } catch (error) {
                throw new Error("Error al crear el departamento: " + error.message);
            }
        }
    
        async update(id, data) {
            try {
                const departamento_universidad = await DepartamentoUniversidad.findByPk(id);
                if (!departamento_universidad) {
                    throw new Error("Departamento universidad no encontrada");
                }
                await departamento_universidad.update(data);
                return departamento_universidad;
            } catch (error) {
                throw new Error("Error al actualizar el departamento universitario: " + error.message);
            }
        }
    
        async delete(id) {
            try {
                const departamento_universidad = await DepartamentoUniversidad.findByPk(id);
                if (!departamento_universidad) {
                    throw new Error("departamento universitario no encontrado");
                }
                await departamento_universidad.destroy();
                return { message: "departamento universitario eliminado" };
            } catch (error) {
                throw new Error("Error al eliminar el deprartamento universitario: " + error.message);
            }
        }
    
}
export const departamentoUniversidadService = new DepartamentoUniversidadService();