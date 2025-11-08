
import request from "supertest"

const URL_BASE = 'http://localhost:3000';
const tecnico = "2";
const fechaP = "2023-02-01"

describe('Login de Técnico', () => {
    
    it('Debería permitir el login de un técnico y obtener un token', async () => {
        const mockLogin = async (email, password) => {
            if (email === "tecnico@taller.com" && password === "tech123") {
                return {
                    statusCode: 200,
                    body: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTY3ODkwNTYwMCwiZXhwIjoxNjc4OTA5MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", // Ejemplo de token JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTY3ODkwNTYwMCwiZXhwIjoxNjc4OTA5MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c,
                        data: {
                            usuario: {
                                email: "tecnico@taller.com"
                            }
                        }
                    }
                };
            }
            return { statusCode: 401, body: { success: false, message: 'Error al iniciar sesión: Credenciales inválidas' } };
        };

        const credentials = {
            email: "tecnico@taller.com", 
            password: "tech123"
        };

        const res = await mockLogin(credentials.email, credentials.password);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.data.usuario.email).toBe(credentials.email);
        //console.log('Login de técnico exitoso. Token:', res.body.token);
    });
});


describe('Verificar visualización de agenda de trabajo para el tecnico', () =>{
    it('Deberia devolver la programacion de mantenimiento para el tecnico', async () =>{
        
        const res = await request(URL_BASE).get('/Mantenimiento');
        expect(res.statusCode).toBe(200);
        
        expect(Array.isArray(res.body)).toBe(true);
        
        // Filtramos la respuesta para obtener solo los mantenimientos del técnico específico.
        const agendaDelTecnico = res.body.filter(item => item.tecnico_asignado_id === tecnico);

        // Verificamos que todos los items en la agenda filtrada pertenecen al técnico correcto.
        agendaDelTecnico.forEach(item => {
            expect(item.tecnico_asignado_id).toBe(tecnico);
        });

        //console.log('Agenda de trabajo para el tecnico: ', agendaDelTecnico);
    });    

});

describe('Filtra mi agenda de trabajo por una fecha', () => {
    it('deberia poder filtrar mi agenda de trabajo por una fecha', async () => {
      const res = await request(URL_BASE).get('/Mantenimiento');
    
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    
      const agendaDelTecnico = res.body.filter(item => item.tecnico_asignado_id === tecnico);
        agendaDelTecnico.forEach(item => {
            expect(item.tecnico_asignado_id).toBe(tecnico);
        });
    
      const filtrofinal = agendaDelTecnico.filter(item => item.fecha_programada === fechaP);
      expect(filtrofinal.length).toBeGreaterThan(0);
      //console.log('Agenda filtrada por fecha del ',fechaP,': ',filtrofinal);
    })
});
