import { sequelize } from "../../shared/database/database";
import { DataTypes } from "sequelize";

export const MateriaPrima = sequelize.define(
  "MateriaPrima",
  {
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
