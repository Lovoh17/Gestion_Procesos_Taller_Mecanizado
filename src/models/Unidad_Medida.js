import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Unidad_Medida = sequelize.define("unidades_medida", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abreviatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},{
    timestamps: false,
    tableName: "unidades_medida",
});