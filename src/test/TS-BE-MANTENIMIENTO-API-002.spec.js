import { response } from 'express';
import request from 'supertest'

const URL_BASE = 'http://localhost:3000'

describe('Mantenimientos para tecnico', () => {
     
    let token = null;
    let mantenimientoId = 1;

    beforeAll(async () => {
        const loginResponse = await request(URL_BASE)
            .post('/auth/login')
            .send({
                email: 'tecnico@email.com',
                password: 'tec123'
            });
        
        token = loginResponse.body.data.token;
        //console.log("login succesfull acontinuacion el token");
        //console.log(token);
    });

    it('Debería permitir a un técnico obtener los mantenimientos asignados', async () => {
        const response = await request(URL_BASE)
            .get('/Mantenimiento')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        const mantenimientosAsignados = response.body.filter(m => m.tecnico_asignado_id === "2");
        expect(mantenimientosAsignados.length).toBeGreaterThan(0);
        expect(mantenimientosAsignados.some(m => m.id === `${mantenimientoId}`)).toBe(true);
        //console.log("Los mantenimiento asignado son: ", mantenimientosAsignados)
    });

    it('Debería permitir a un técnico cambiar el estado de un mantenimiento asignado a "En Proceso"', async () => {
        
        const response = await request(URL_BASE)
            .put(`/Mantenimiento/${mantenimientoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ estado_id: "2" }); 

        expect(response.statusCode).toEqual(200);
        //expect(response.body.message).toEqual('Mantenimiento actualizado exitosamente');
        expect(response.body.estado_id).toEqual("2");
        //console.log("Mantenimiento cambiado a en proceso(estado_id: 2) con exito")
    });
    
})