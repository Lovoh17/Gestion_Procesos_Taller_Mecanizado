import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Competencia = sequelize.define("Competencia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: "competencias",
  timestamps: false
});
