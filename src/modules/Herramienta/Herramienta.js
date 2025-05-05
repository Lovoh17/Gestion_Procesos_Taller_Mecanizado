import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Herramienta = sequelize.define(
  "herramientas",
  {
    id_herramienta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_herramienta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_herramienta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "herramientas",
    timestamps: false,
  }
);
