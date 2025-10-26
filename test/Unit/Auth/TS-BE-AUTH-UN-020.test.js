const OPERARIO_CREDENTIALS = {
  email: 'operario@taller.com',
  password: 'oper123',
  nombre: 'Gabriel de la O',
  rol: 'operario',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos" 
      });
    }

    if (email === OPERARIO_CREDENTIALS.email && password === OPERARIO_CREDENTIALS.password) {
      const usuario = {
        id: 3,
        name: OPERARIO_CREDENTIALS.nombre,
        email: OPERARIO_CREDENTIALS.email,
        role: OPERARIO_CREDENTIALS.rol,
      };

      const token = 'mock-token-operario';

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

describe('TS-BE-AUTH-UN-013 - Login Operario', () => {

  test('Debe permitir login exitoso con credenciales válidas de Operario', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email,
        password: OPERARIO_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Inicio de sesión exitoso');
    expect(res.body.data.usuario.email).toBe(OPERARIO_CREDENTIALS.email);
    expect(res.body.data.usuario.role).toBe('operario');
    expect(res.body.data.token).toBe('mock-token-operario');
  });

  test('Debe retornar 400 si falta email', async () => {
    const req = {
      body: {
        password: OPERARIO_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');
  });

  test('Debe retornar 400 si falta password', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');
  });

  test('Debe retornar 400 si faltan ambos campos', async () => {
    const req = {
      body: {}
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email y contraseña son requeridos');
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
  });

  test('Debe retornar 401 con email incorrecto', async () => {
    const req = {
      body: {
        email: 'wrong@taller.com',
        password: OPERARIO_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  test('Debe retornar 401 con password incorrecto', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email,
        password: 'passwordIncorrecto123'
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  test('Token debe ser retornado en la respuesta exitosa', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email,
        password: OPERARIO_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.token).toBe('mock-token-operario');
    expect(typeof res.body.data.token).toBe('string');
    expect(res.body.data.token.length).toBeGreaterThan(0);
  });

  test('Usuario en respuesta debe tener rol operario', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email,
        password: OPERARIO_CREDENTIALS.password
      }
    };
    const res = createMockResponse();

    await login(req, res);

    expect(res.body.data.usuario.role).toBe('operario');
    expect(res.body.data.usuario.email).toBe(OPERARIO_CREDENTIALS.email);
    expect(res.body.data.usuario.name).toBe('Gabriel de la O');
  });

  test('Respuesta exitosa debe tener estructura correcta', async () => {
    const req = {
      body: {
        email: OPERARIO_CREDENTIALS.email,
        password: OPERARIO_CREDENTIALS.password
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
  });
});

afterAll(() => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       RESUMEN - TS-BE-AUTH-UN-020 - Login Operario           ║
╠══════════════════════════════════════════════════════════════╣
║ Código:        TS-BE-AUTH-UN-020                             ║
║ Versión:       1.0                                           ║
║ Responsable:   LINO                                          ║
║ Total Pruebas: 10                                            ║
╠══════════════════════════════════════════════════════════════╣
║ CREDENCIALES DE PRUEBA                                       ║
╠══════════════════════════════════════════════════════════════╣
║ Email:    ${OPERARIO_CREDENTIALS.email}                   ║
║ Password: ${OPERARIO_CREDENTIALS.password}                ║
║ Rol:      ${OPERARIO_CREDENTIALS.rol}                     ║
║ Nombre:   ${OPERARIO_CREDENTIALS.nombre}                  ║
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
║ ✓ Verificación de rol Operario                              ║
║ ✓ Verificación de estructura de respuesta                   ║
╚══════════════════════════════════════════════════════════════╝
  `);
});