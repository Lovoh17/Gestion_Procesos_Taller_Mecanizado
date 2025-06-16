import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "../Usuario/Usuario.js";
import { Tipo_Telefono } from "../Tipo_Telefono/Tipo_Telefono.js";

export const TelefonoUsuario = sequelize.define(
  "telefonos_usuario",
  {
    id_telefono: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        reference:{
          model: Usuario,
          key: 'id'
        }
    },
    tipo_telefono_id: {
        type: DataTypes.STRING,
        allowNull: false,
        reference:{
          model: Tipo_Telefono,
          key: 'id'
        }
    },
    numero:{
      type: DataTypes.STRING,
      allowNull: false
    },
    es_principal:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    tableName: "telefonos_usuario",
    timestamps: false,
  }
);
