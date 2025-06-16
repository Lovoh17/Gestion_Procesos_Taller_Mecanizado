import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Permiso = sequelize.define("permiso",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autorIncrement: true
    },
    role_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        reference:{
            model: "roles",
            key: "id"
        }
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "permisos",
    timestamps: false
});