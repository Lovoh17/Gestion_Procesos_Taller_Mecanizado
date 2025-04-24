import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Tipo_Materia_Prima = sequelize.define("tipo_materias_prima", {
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
      type: DataTypes.TEXT,
      allowNull: false,
    }
},{
    timestamps: false,
    tableName: "tipo_materias_prima",
});