import request from 'supertest';

const API_URL = 'http://localhost:3000';

describe('Mantenimiento Service',() =>{
    beforeEach(() =>{
        jest.clearAllMocks();
    });
    
    describe('Validar gestión de actividades de mantenimiento', () => {
        let id_mantenimiento;

        

        it('Crear nuevo mantenimiento exitosamente', async () => {
           const nuevoMantenimiento = {
            nombre: "Mantenimiento de prueba",
            herramienta_id: 1,
            tipo_mantenimiento_id: 1, // Preventivo
            prioridad_id: 2, // Alta
            estado_id: 1, // <- Agregar un ID de estado válido (ej: 1 para "Pendiente")
            tecnico_asignado_id: 2,
            fecha_programada: "2024-01-15", // <- Cambiado a formato DATEONLY (YYYY-MM-DD)
            descripcion_problema: "Prueba de creación desde test automatizado",
            mantenimiento_hecho_por: 2 // <- Agregar ID del usuario que realiza el mantenimiento
        };
            const res = await request(API_URL)
                .post('/Mantenimiento')
                .send(nuevoMantenimiento);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            id_mantenimiento = res.body.id;
            
            //console.log('Mantenimiento creado exitosamente');
            //console.log('Response: ', res.body);
        })

        it('Verificar mantenimiento en listado pendiente', async () => {
            const res = await request(API_URL).get(`/Mantenimiento/${id_mantenimiento}`)

    
            expect(res.statusCode).toBe(200);
            //expect()
            //expect().toBe(object);
            
            // Verificar que el mantenimiento creado aparece en el listado
            //const mantenimientoCreado = res.body.find(m => m.equipo === "EQ-001");
            //expect(mantenimientoCreado).toBeDefined();
            expect(res.body.estado_id).toBe("1");
            
            //console.log('Mantenimiento aparece en listado de pendientes');
            //console.log('Response: ', res.body);
        })

        
        it('Verificación que el mantenimiento este en la lista de otro mantenimientos', async () => {
            const res = await request(API_URL).get('/Mantenimiento')
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
            ////console.log('Obtención de mantenimiento completa')
            ////console.log('Response: ',res.body)
        })
    })
});