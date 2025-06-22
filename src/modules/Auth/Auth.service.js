import { Usuario } from "../Usuario/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const JWT_SECRET = process.env.JWT_SECRET; 

class AuthService {
    async login(email, password) {
        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                throw new Error("Credenciales inválidas");
            }

            const passwordValida = await bcrypt.compare(password, usuario.password);

            if (!passwordValida) {
                throw new Error("Credenciales inválidas");
            }

            await usuario.update({ ultimo_acceso: new Date() });

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre
                },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            return {
                usuario,
                token
            };
        } catch (error) {
            throw new Error("Error al iniciar sesión: " + error.message);
        }
    }
}

export const authService = new AuthService();

