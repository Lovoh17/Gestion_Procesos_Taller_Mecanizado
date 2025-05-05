import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Telefono_Usuario = sequelize.define(
  "telefonos_usuario",
  {
    id_telefono: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    tipo_telefono_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero:{
      type: DataTypes.STRING,
      allowNull: false
    },
    es_principal:{
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    }
  },
  {
    tableName: "telefonos_usuario",
    timestamps: false,
  }
);
