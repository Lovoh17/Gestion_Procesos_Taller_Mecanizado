import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Estado_Herramienta = sequelize.define("estado_herramienta",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permiso_uso:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    color_indicador:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    requiere_autorizacion:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'estado_herramienta'
});