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
                const departamento_universidad = await DepartamentoUniversidad.findByPk(id);
                if (!zonaTrabajo) {
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