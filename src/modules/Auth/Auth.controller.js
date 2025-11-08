import { authService } from "./Auth.service.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const { usuario, token } = await authService.login(email, password);

        res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: {
                usuario,
                token
            }
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export const loginfalse = async (req, res) => {
    try {
        const Empleados = [
        {   
            email: "operario@email.com",//operario
            password:"ope123"
        },{
            email: "coordinador@email.com",
            password: "cord123"
        },{
            email: "tecnico@email.com",
            password: "tec123"
        }        
        ]
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuario = Empleados.find(emp => emp.email === email && emp.password === password);

        if (!usuario) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
        
        res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: {
                usuario,
                token: `token.${usuario.email}.${Date.now()}`
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }

}
