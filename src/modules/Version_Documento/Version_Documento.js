import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Plano } from "../Plano/Plano.js";
import { Usuario } from "../Usuario/Usuario.js";

export const Version_Documento = sequelize.define("versiones_documentos", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  planoId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Plano,
      key: "id"
    }
  },
  numero_version: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creado_por: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id"
    }
  },
  archivo_ruta: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: "versiones_documentos",
  indexes: [
    {
      unique: true,
      fields: ['planoId', 'numero_version']
    }
  ]
});
