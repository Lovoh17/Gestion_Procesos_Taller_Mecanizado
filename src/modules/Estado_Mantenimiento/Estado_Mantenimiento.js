import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Estado_Mantenimiento = sequelize.define("estado_mantenimiento", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_estado:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'estado_mantenimiento'
});
