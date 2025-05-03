import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Tipo_Telefono = sequelize.define("tipos_telefono", {
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

},{
    timestamps: false,
    tableName: "tipos_telefono"
});