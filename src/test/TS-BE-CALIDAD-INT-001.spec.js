import request from 'supertest';

const API_URL = 'http://localhost:3000';

describe('Control de Calidad - Integración Completa', () => {
    let coordinadorToken;
    let tecnicoToken;
    let pedidoId;
    let mantenimientoId;
    let asignacionId;

    // 1. Login de Coordinador
    it('Debería permitir el login del coordinador y obtener un token', async () => {
        const res = await request(API_URL)
            .post('/auth/login')
            .send({
                email: 'coordinador@email.com',
                password: 'cord123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('token');
        coordinadorToken = res.body.data.token;
        // console.log('Coordinador Token:', coordinadorToken);
    });

    // 2. Login de Técnico
    it('Debería permitir el login del técnico y obtener un token', async () => {
        const res = await request(API_URL)
            .post('/auth/login')
            .send({
                email: 'tecnico@email.com',
                password: 'tec123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('token');
        tecnicoToken = res.body.data.token;
        // console.log('Técnico Token:', tecnicoToken);
    });

    // 3. Crear un Pedido (por Coordinador)
    it('Debería permitir al coordinador crear un nuevo pedido', async () => {
        const timestamp = Date.now();

        const nuevoPedido = {
            codigo_pedido: `PED-TEST-${timestamp}`,
            tipo_pedido_id: 1, // Ejemplo: Fabricación
            plano_id: 1, // Asegúrate de que este ID exista en tu DB
            solicitante_id: 1, // Asegúrate de que este ID exista en tu DB
            supervisor_id: 2, // Asegúrate de que este ID exista en tu DB
            fecha_solicitud: "2024-01-15",
            fecha_requerida: "2024-01-25",
            estado_id: 1, // Pendiente
            prioridad: 2, // Media
            proyecto_asociado: `PROJ-TEST-${timestamp}`,
            costo_estimado: 150.00,
            precio_final: 500.00,
            notas: "Pedido de prueba para integración de calidad"
        };

        const res = await request(API_URL)
            .post('/Pedido')
            .set('Authorization', `Bearer ${coordinadorToken}`)
            .send(nuevoPedido);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        pedidoId = res.body.id;
        // console.log('Pedido Creado:', res.body);
    });

    // 4. Asignar Pedido a Técnico (por Coordinador)
    it('Debería permitir al coordinador asignar el pedido a un técnico', async () => {
        const asignacion = {
            usuarioId: 3, // ID del técnico
            pedidoId: pedidoId,
            horasAsignadas: 18
        };

        const res = await request(API_URL)
            .post('/Asignaciones')
            .set('Authorization', `Bearer ${coordinadorToken}`)
            .send(asignacion);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        asignacionId = res.body.id;
        // console.log('Asignación Creada:', res.body);
    });

    // 5. Técnico inicia el trabajo (cambia estado del pedido a "En Proceso")
    it('Debería permitir al técnico cambiar el estado del pedido a "En Proceso"', async () => {
        const res = await request(API_URL)
            .put(`/Pedido/${pedidoId}`)
            .set('Authorization', `Bearer ${tecnicoToken}`)
            .send({ estado_id: 2 }); // 2 = EnProceso
        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(2);
        // console.log('Pedido en Proceso:', res.body);
    });

    // 6. Técnico finaliza el trabajo (cambia estado del pedido a "Completado")
    it('Debería permitir al técnico cambiar el estado del pedido a "Completado"', async () => {
        const res = await request(API_URL)
            .put(`/Pedido/${pedidoId}`)
            .set('Authorization', `Bearer ${tecnicoToken}`)
            .send({ estado_id: 3 }); // 3 = Completado

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(3);
        // console.log('Pedido Completado:', res.body);
    });

    // 7. Coordinador verifica el pedido completado (opcional, pero buena práctica)
    it('Debería permitir al coordinador verificar el pedido completado', async () => {
        const res = await request(API_URL)
            .get(`/Pedido/${pedidoId}`)
            .set('Authorization', `Bearer ${coordinadorToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(3);
        // console.log('Coordinador verifica Pedido Completado:', res.body);
    });

    // 8. Coordinador crea un mantenimiento para el pedido (simulando una revisión de calidad)
    it('Debería permitir al coordinador crear un mantenimiento para el pedido completado', async () => {
        const nuevoMantenimiento = {
            nombre: `Revisión de Calidad Pedido ${pedidoId}`,
            herramienta_id: 1, // Herramienta genérica para revisión
            tipo_mantenimiento_id: 3, // Calibración/Revisión
            prioridad_id: 1, // Baja
            estado_id: 1, // Pendiente
            tecnico_asignado_id: 2, // Asignado al mismo técnico
            fecha_programada: "2024-02-01",
            descripcion_problema: `Revisión de calidad para el pedido ${pedidoId} después de su finalización.`,
            mantenimiento_hecho_por: 1 // Coordinador
        };

        const res = await request(API_URL)
            .post('/Mantenimiento')
            .set('Authorization', `Bearer ${coordinadorToken}`)
            .send(nuevoMantenimiento);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        mantenimientoId = res.body.id;
        // console.log('Mantenimiento de Calidad Creado:', res.body);
    });

    // 9. Técnico realiza el mantenimiento de calidad (cambia estado a "En Proceso")
    it('Debería permitir al técnico cambiar el estado del mantenimiento de calidad a "En Proceso"', async () => {
        const res = await request(API_URL)
            .put(`/Mantenimiento/${mantenimientoId}`)
            .set('Authorization', `Bearer ${tecnicoToken}`)
            .send({ estado_id: 2 }); // 2 = En Proceso

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(2);
        // console.log('Mantenimiento de Calidad en Proceso:', res.body);
    });

    // 10. Técnico finaliza el mantenimiento de calidad (cambia estado a "Completado")
    it('Debería permitir al técnico cambiar el estado del mantenimiento de calidad a "Completado"', async () => {
        const res = await request(API_URL)
            .put(`/Mantenimiento/${mantenimientoId}`)
            .set('Authorization', `Bearer ${tecnicoToken}`)
            .send({ estado_id: 3 }); // 3 = Completado

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(3);
        // console.log('Mantenimiento de Calidad Completado:', res.body);
    });

    // 11. Coordinador verifica el mantenimiento de calidad completado (opcional)
    it('Debería permitir al coordinador verificar el mantenimiento de calidad completado', async () => {
        const res = await request(API_URL)
            .get(`/Mantenimiento/${mantenimientoId}`)
            .set('Authorization', `Bearer ${coordinadorToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual("3");
        // console.log('Coordinador verifica Mantenimiento de Calidad Completado:', res.body);
    });

    // 12. Coordinador marca el pedido como "Calidad Aprobada" (nuevo estado o actualización de notas)
    // Suponiendo que hay un estado 4 para "Calidad Aprobada" o se actualizan las notas.
    it('Debería permitir al coordinador marcar el pedido como "Calidad Aprobada"', async () => {
        const res = await request(API_URL)
            .put(`/Pedido/${pedidoId}`)
            .set('Authorization', `Bearer ${coordinadorToken}`)
            .send({ 
                estado_id: 4, // Suponiendo que 4 es "Calidad Aprobada"
                notas: "Pedido aprobado por control de calidad."
            }); 

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_id).toEqual(4);
        expect(res.body.notas).toContain("Pedido aprobado por control de calidad.");
        // console.log('Pedido con Calidad Aprobada:', res.body);
    });
});