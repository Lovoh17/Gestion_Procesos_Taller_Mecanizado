import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Estado_Reparacion = sequelize.define(
    "Estado_Reparacion",
    {
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_estado:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "estado_reparacion",
        timestamps: false,
    }
)