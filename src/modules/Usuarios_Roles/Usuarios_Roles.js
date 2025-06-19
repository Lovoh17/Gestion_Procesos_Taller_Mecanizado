import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Usuarios_Roles = sequelize.define("usuarios_roles",{
    usuario_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: "usuario",
            key: "id"
        }
    },
    role_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model:"roles",
            key: "id"
        }
    }
},
{
    tableName: "usuarios_roles",
    timestamps: false
});