import request from 'supertest';

const URL_BASE = 'http://localhost:3000';

const orden_id = "4";
const tecnico_id = "3";

describe('Validar sistema de asignación de tareas', () => {
  let numAsignaciones;

  
  it('Asignamos a un tecnico al pedido solicitado', async () => { 
    const res = await request(URL_BASE)
      .post('/Asignaciones')
      .send({
        usuarioId: tecnico_id,
        pedidoId: orden_id,
        horasAsignadas: 8
      })

    //console.log(res.body)
    expect(res.status).toBe(201)
    expect(res.body.usuarioId).toBe(tecnico_id) 
    expect(res.body.pedidoId).toBe(orden_id)
    expect(res.body.horasAsignadas).toBe(8)
    
    numAsignaciones = res.body.id;
  
  })   

  it('Comprobamos que la asignacion se haya hecho correctamente', async () => { 
    const res = await request(URL_BASE)
      .get(`/Asignaciones/${numAsignaciones}`)
      .send()

    //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.usuarioId).toBe(tecnico_id) 
    expect(res.body.pedidoId).toBe(orden_id)
    expect(res.body.horasAsignadas).toBe(8)
  
  })   


})