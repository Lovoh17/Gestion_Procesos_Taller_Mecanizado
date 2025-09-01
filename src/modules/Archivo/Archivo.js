import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Archivo = sequelize.define("archivos", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_subida: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
  }
}, {
  timestamps: false,
  tableName: "archivos"
});
