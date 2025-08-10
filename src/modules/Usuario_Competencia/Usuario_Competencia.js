import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "../Usuario/Usuario.js";
import { Competencia } from "../Competencia/Competencia.js";

export const UsuarioCompetencia = sequelize.define("UsuarioCompetencia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id"
    }
  },
  competenciaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Competencia,
      key: "id"
    }
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: "usuarios_competencias",
  timestamps: false
});
