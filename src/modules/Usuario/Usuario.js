import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puesto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    estado_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    foto_ruta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    es_subcontratado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "para pedidos grandes",
    },
    fecha_contratacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_termino_contrato: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "si es permanente null",
    },
    habilidades_tecnicas: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    turno_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    zona_trabajo_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ultimo_acceso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timestamps: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
