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

            if (!usuario.password.startsWith('$2a$') && !usuario.password.startsWith('$2b$') && !usuario.password.startsWith('$2y$')) {
                throw new Error("Error de configuración de contraseña. Contacte al administrador.");
            }

            const passwordValida = await bcrypt.compare(password, usuario.password);
            

            if (!passwordValida) {
                const testHash = await bcrypt.hash(password, 12);
                const testCompare = await bcrypt.compare(password, testHash);
            
                throw new Error("Credenciales inválidas");
            }

            await usuario.update({ ultimo_acceso: new Date() });

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    puesto_id: usuario.puesto_id
                },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            return {
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    puesto_id: usuario.puesto_id,
                    estado_id: usuario.estado_id,
                    ultimo_acceso: usuario.ultimo_acceso
                },
                token
            };
        } catch (error) {
            throw new Error("Error al iniciar sesión: " + error.message);
        }
    }
}

export const authService = new AuthService();
