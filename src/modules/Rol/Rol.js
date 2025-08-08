import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Rol = sequelize.define("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permiso_subida: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
},{
    timestamps: false,
    tableName: "roles",
});