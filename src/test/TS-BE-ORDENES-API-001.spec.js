import request from 'supertest';

const URL_BASE = 'http://localhost:3000';

describe('Verificacion completa de ordenes de trabajo', () => {
    it('Login del coordinador', async () => {
        const res = await request(URL_BASE)
            .post('/auth/login')
            .send({
                email: 'coordinador@email.com', 
                password: 'cord123'
            })

        ////console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('token');
    })

    it('Crear una nueva orden de trabajo y se asigna a un tecnico logeado', async () => {
        const timestamp = Date.now();
        const Pedido = {
            codigo_pedido: `NOT-TEST-${timestamp}`,
            tipo_pedido_id: 1,
            plano_id: 1,
            solicitante_id: 1, // Cambiado a un ID de usuario existente en la base de datos
            supervisor_id: 2, // Cambiado a un ID de usuario existente en la base de datos
            fecha_solicitud: "2024-01-15T09:00:00.000Z",
            fecha_requerida: "2024-01-25",
            estado_id: 1,
            prioridad: 2,
            proyecto_asociado: `PROJ-TEST-${timestamp}`,
            costo_estimado: 200.00,
            precio_final: 700.00,
            notas: "Pedido de prueba automatizada"
        }

        const res = await request(URL_BASE)
            .post('/Pedido')
            .send(Pedido)
        ////console.log(res.body)
        expect(res.statusCode).toBe(201);
        expect(typeof res.body).toBe('object');
    })


    it('Obtener todas las ordenes de trabajo', async () => {
        const res = await request(URL_BASE)
            .get('/Pedido')

        ////console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');

    })

    
    
})
