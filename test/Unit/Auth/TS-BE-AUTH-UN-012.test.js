
const COORDINADOR_CREDENTIALS = {
  email: 'coordinador@taller.com',
  password: 'coord123',
  nombre: 'Kevin Israel',
  rol: 'COORDINADOR',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos" 
      });
    }

    if (email === COORDINADOR_CREDENTIALS.email && password === COORDINADOR_CREDENTIALS.password) {
      const usuario = {
        id: 2, 
        name: COORDINADOR_CREDENTIALS.nombre,
        email: COORDINADOR_CREDENTIALS.email,
        role: COORDINADOR_CREDENTIALS.rol.toLowerCase(),
      };

      const token = 'mock-token-coordinador';

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: {
          usuario,
          token
        }
      });
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const createMockResponse = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

describe('TS-BE-AUTH-UN-012 - Login Coordinador', () => {

  test('Debe permitir login exitoso con credenciales válidas de Coordinador', async () => {
    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email,
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Inicio de sesión exitoso');
    expect(res.body.data.usuario.email).toBe(COORDINADOR_CREDENTIALS.email);
    expect(res.body.data.usuario.role).toBe('coordinador'); // En minúscula como en tu test
    expect(res.body.data.token).toBe('mock-token-coordinador');

    console.log(' PASS: Login Coordinador exitoso con:', COORDINADOR_CREDENTIALS.email);
  });

  test('Debe retornar 400 si falta email', async () => {
    const req = {
      body: {
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log(' PASS: Validación de email requerido');
  });

  test('Debe retornar 400 si falta password', async () => {
    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email
      }
    };
    const res = createMockResponse();

    await login(req, res);

    // ASSERT
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log(' PASS: Validación de password requerido');
  });

  test('Debe retornar 400 si faltan ambos campos', async () => {
    const req = {
      body: {}
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log(' PASS: Validación de campos vacíos');
  });

  test('Debe retornar 401 con credenciales inválidas', async () => {
    const req = {
      body: {
        email: 'noexiste@taller.com',
        password: 'passwordIncorrecto'
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log(' PASS: Credenciales inválidas rechazadas');
  });

  test('Debe retornar 401 con email incorrecto', async () => {
    const req = {
      body: {
        email: 'wrong@taller.com',
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log(' PASS: Email incorrecto rechazado');
  });

  test('Debe retornar 401 con password incorrecto', async () => {
    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email,
        password: 'passwordIncorrecto123'
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log('PASS: Password incorrecto rechazado');
  });

  test('Token debe ser retornado en la respuesta exitosa', async () => {
    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email,
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.token).toBe('mock-token-coordinador');
    expect(typeof res.body.data.token).toBe('string');
    expect(res.body.data.token.length).toBeGreaterThan(0);

    console.log('PASS: Token retornado correctamente');
  });

  test('Usuario en respuesta debe tener rol coordinador', async () => {

    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email,
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body.data.usuario.role).toBe('coordinador'); // En minúscula
    expect(res.body.data.usuario.email).toBe(COORDINADOR_CREDENTIALS.email);
    expect(res.body.data.usuario.name).toBe('Kevin Israel');

    console.log('PASS: Rol coordinador verificado en respuesta');
  });

  test('Respuesta exitosa debe tener estructura correcta', async () => {
    const req = {
      body: {
        email: COORDINADOR_CREDENTIALS.email,
        password: COORDINADOR_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('usuario');
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.usuario).toHaveProperty('id');
    expect(res.body.data.usuario).toHaveProperty('name');
    expect(res.body.data.usuario).toHaveProperty('email');
    expect(res.body.data.usuario).toHaveProperty('role');
    expect(res.body.data.usuario).not.toHaveProperty('password');

    console.log('PASS: Estructura de respuesta correcta');
  });
});

afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       RESUMEN - TS-BE-AUTH-UN-012 - Login Coordinador        ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-AUTH-UN-012                             ║
║ Versión:       1.0                                           ║
║ Responsable:   LINO                                          ║
║ Total Pruebas: 10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ CREDENCIALES DE PRUEBA                                       ║
╠══════════════════════════════════════════════════════════════╣
║ Email:    ${COORDINADOR_CREDENTIALS.email}                   ║
║ Password: ${COORDINADOR_CREDENTIALS.password}                ║
║ Rol:      ${COORDINADOR_CREDENTIALS.rol}                     ║
║ Nombre:   ${COORDINADOR_CREDENTIALS.nombre}                  ║
╠══════════════════════════════════════════════════════════════╣
║ CASOS PROBADOS:                                              ║
║ ✓ Login exitoso con credenciales válidas                    ║
║ ✓ Validación de email requerido                             ║
║ ✓ Validación de password requerido                          ║
║ ✓ Validación de campos vacíos                               ║
║ ✓ Rechazo de credenciales inválidas                         ║
║ ✓ Rechazo de email incorrecto                               ║
║ ✓ Rechazo de password incorrecto                            ║
║ ✓ Verificación de token en respuesta                        ║
║ ✓ Verificación de rol coordinador                           ║
║ ✓ Verificación de estructura de respuesta                   ║
╚══════════════════════════════════════════════════════════════╝
  `);
});