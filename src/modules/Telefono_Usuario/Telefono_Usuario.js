import { sequelize } from "../../shared/database/database";
import { DataTypes } from "sequelize";

export const Telefono_Usuario = sequelize.define(
  "telefonos_usuario",
  {
    id_telefono: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {
    tableName: "telefonos_usuario",
    timestamps: false,
  }
);
