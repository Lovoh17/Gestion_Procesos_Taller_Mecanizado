import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/database/database.js";

export const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo_recuperacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /*id_zona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },*/
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
