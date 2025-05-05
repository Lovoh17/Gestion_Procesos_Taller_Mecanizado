import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Herramienta = sequelize.define(
  "herramientas",
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
    tipo_herramienta_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fabricante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_serie: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    codigo_inventario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    estado_herramienta_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    vida_util_horas: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      
    },
    horas_uso_actual: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    zonas_trabajo_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    fecha_adquisicion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    costo_adquisicion: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_actual: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      
    },
    especificaciones_tecnicas: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    imagen_ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_ultimo_mantenimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_proximo_mantenimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamps: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "herramientas",
    timestamps: false,
  }
);
