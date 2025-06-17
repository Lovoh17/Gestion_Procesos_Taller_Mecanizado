import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const TipoAlerta = sequelize.define("tipos_alertas",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_alertas:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "tipos_alertas",
    timestamps: false,
});