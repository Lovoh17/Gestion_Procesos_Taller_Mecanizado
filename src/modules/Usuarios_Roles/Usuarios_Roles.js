import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"
import { Usuario } from "../Usuario/Usuario.js"
import { Rol } from "../Rol/Rol.js"

export const Usuarios_Roles = sequelize.define("usuarios_roles",{
    usuario_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: Usuario,
            key: "id"
        }
    },
    role_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: Rol,
            key: "id"
        }
    }
},
{
    tableName: "usuarios_roles",
    timestamps: false
});