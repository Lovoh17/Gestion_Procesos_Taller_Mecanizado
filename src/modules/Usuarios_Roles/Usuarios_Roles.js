import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Usuarios_Roles = sequelize.define("usuarios_roles",{
    usuario_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        reference:{
            model: "usuario",
            key: "id"
        }
    },
    role_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        reference:{
            model:"roles",
            key: "id"
        }
    }
},
{
    tableName: "usuario",
    timestamps: false
})