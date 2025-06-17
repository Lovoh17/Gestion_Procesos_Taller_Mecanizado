import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const DepartamentoUniversidad = sequelize.define("departamentos_universidad",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "departamentos_universidad",
    timestamps: false
});