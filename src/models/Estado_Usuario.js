import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Estado_Usuario = sequelize.define("estado_usuario", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    permite_acceso:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    color_indicador:{
        type: DataTypes.STRING,
        allowNull: false
    },
    es_editable:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

},{
    timestamps: false,
    tableName: "estado_usuario"
});