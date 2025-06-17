import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const EstadoReparacion = sequelize.define("estado_reparacion", {
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