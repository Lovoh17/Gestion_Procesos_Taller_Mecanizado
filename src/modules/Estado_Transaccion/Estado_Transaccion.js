import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Estado_Transaccion = sequelize.define("estado_transaccion",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_estado:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "estado_transaccion",
    timestamps: false
});