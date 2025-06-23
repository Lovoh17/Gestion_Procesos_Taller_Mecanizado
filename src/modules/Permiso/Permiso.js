import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Permiso = sequelize.define("permisos",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autorIncrement: true
    },
    role_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
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