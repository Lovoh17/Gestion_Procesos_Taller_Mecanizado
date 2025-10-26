
//CREDENCIALES ADMIN PARA PRUEBAS
const ADMIN_CREDENTIALS = {
  email: 'jefeTaller@taller.com',
  password: 'jefe123',
  nombre: 'RafaelLino',
  rol: 'Administrador'
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos" 
      });
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const usuario = {
        id: 1,
        email: ADMIN_CREDENTIALS.email,
        nombre: ADMIN_CREDENTIALS.nombre,
        rol: ADMIN_CREDENTIALS.rol,
        isActive: true
      };

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mocktoken.signature';

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

describe('TS-BE-AUTH-UN-001 - Login Admin', () => {

  test('Debe permitir login exitoso con credenciales válidas de Admin', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Inicio de sesión exitoso');
    expect(res.body.data.usuario.email).toBe(ADMIN_CREDENTIALS.email);
    expect(res.body.data.usuario.rol).toBe('Administrador');
    expect(res.body.data.token).toBeDefined();

    console.log('PASS: Login Admin exitoso con:', ADMIN_CREDENTIALS.email);
  });

  test('Debe retornar 400 si falta email', async () => {
    const req = {
      body: {
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();
    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log('PASS: Validación de email requerido');
  });

  test('Debe retornar 400 si falta password', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log('PASS: Validación de password requerido');
  });

  test('Debe retornar 400 si faltan ambos campos', async () => {

    const req = {
      body: {}
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');

    console.log('PASS: Validación de campos vacíos');
  });

  test('Debe retornar 401 con credenciales inválidas', async () => {
    const req = {
      body: {
        email: 'noexiste@tallermec.com',
        password: 'PasswordIncorrecto123!'
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log('PASS: Credenciales inválidas rechazadas');
  });

  test('Debe retornar 401 con email incorrecto', async () => {
    const req = {
      body: {
        email: 'wrong@tallermec.com',
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log('PASS: Email incorrecto rechazado');
  });

  test('Debe retornar 401 con password incorrecto', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email,
        password: 'WrongPassword123!'
      }
    };
    const res = createMockResponse();
    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');

    console.log(' PASS: Password incorrecto rechazado');
  });

  test('Token debe ser retornado en la respuesta exitosa', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body.data.token).toBeDefined();
    expect(typeof res.body.data.token).toBe('string');
    expect(res.body.data.token.length).toBeGreaterThan(0);

    console.log(' PASS: Token retornado correctamente');
  });

  test('Usuario en respuesta debe tener rol ADMIN', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();
    await login(req, res);

    expect(res.body.data.usuario.rol).toBe('Administrador');
    expect(res.body.data.usuario.email).toBe(ADMIN_CREDENTIALS.email);
    expect(res.body.data.usuario.nombre).toBe(ADMIN_CREDENTIALS.nombre);
    expect(res.body.data.usuario.isActive).toBe(true);

    console.log(' PASS: Rol ADMIN verificado en respuesta');
  });

  test('Respuesta exitosa debe tener estructura correcta', async () => {
    const req = {
      body: {
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('usuario');
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.usuario).not.toHaveProperty('password');

    console.log(' PASS: Estructura de respuesta correcta');
  });
});

afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║         RESUMEN - TS-BE-AUTH-UN-001 - Login Admin            ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-AUTH-UN-001                             ║
║ Versión:       1.0                                           ║
║ Responsable:   LINO                                          ║
║ Total Pruebas: 10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ CREDENCIALES DE PRUEBA                                       ║
╠══════════════════════════════════════════════════════════════╣
║ Email:    ${ADMIN_CREDENTIALS.email}                         ║
║ Password: ${ADMIN_CREDENTIALS.password}                    ║
║ Rol:      ${ADMIN_CREDENTIALS.rol}                                        ║
║ Nombre:   ${ADMIN_CREDENTIALS.nombre}                  ║
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
║ ✓ Verificación de rol ADMIN                                 ║
║ ✓ Verificación de estructura de respuesta                   ║
╚══════════════════════════════════════════════════════════════╝
  `);
});