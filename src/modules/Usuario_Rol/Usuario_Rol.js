import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Usuario_Rol = sequelize.define("usuario_rol",{
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
            model:"rol",
            key: "id"
        }
    }
},
{
    tableName: "usuario_rol",
    timestamps: false
});