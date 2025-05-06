import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Materia_Prima = sequelize.define("materias_prima", {
    id_mp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_mp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medida_mp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_mp: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "materias_prima",
    timestamps: false,
  }
);
