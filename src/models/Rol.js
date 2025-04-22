import { sequelize } from "../database/database.js";
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
    }
},{
    timestamps: false,
    tableName: "roles",
});