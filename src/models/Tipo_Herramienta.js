import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Tipo_Herramienta = sequelize.define("tipo_herramientas", {
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
    caracteristicas_clave: {
        type: DataTypes.JSON,
        allowNull: false,
    },
},{
    timestamps: false,

    tableName: 'tipo_herramientas'

});