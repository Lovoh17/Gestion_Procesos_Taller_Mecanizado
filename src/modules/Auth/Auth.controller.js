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
