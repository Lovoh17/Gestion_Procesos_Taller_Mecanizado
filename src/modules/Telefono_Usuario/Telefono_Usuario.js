import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const TelefonoUsuario = sequelize.define("telefonos_usuario",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    tipo_telefono_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "tipos_telefono",
        key: "id",
      },
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    es_principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "telefonos_usuario",
    timestamps: false,
  }
);