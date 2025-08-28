import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/database/database.js";

export const Zona_Trabajo = sequelize.define("zonas_trabajo",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "soldadura, corte, carpinteria",
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsable_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: "usuarios",
            key: 'id'
        }
    }
},
{
    tableName: "zonas_trabajo",
    timestamps: false,
  }
);