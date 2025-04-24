import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Prioridad_Mantenimiento = sequelize.define("prioridad_mantenimiento", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_prioridad:{
        type: DataTypes.STRING,
        allowNull: false
    },

},{
    timestamps: false,
    tableName: 'prioridad_mantenimiento'
});