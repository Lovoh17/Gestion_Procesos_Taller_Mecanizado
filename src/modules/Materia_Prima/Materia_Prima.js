import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Materia_Prima = sequelize.define("materias_prima", {
    id_mp: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo_materia_prima_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    unidad_base_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    stock_minimo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_maximo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Cantidad máxima recomendada",
    },
    unidades_completas: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "3 tablas de 10m",
    },
    fracciones: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "3m de tabla",
    },
    stock_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Suma de unidades_completas + fracciones",
    },
    fraccion_unidad_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    permite_fraccion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pertenece_a_stock_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "1=pedido internos, 2=pedido externos, 3=prácticas",
    },
    costo_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Costo por unidad base",
    },
    proveedor_principal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tiempo_reposicion: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Días para reponer stock",
    },
    es_controlado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "Si requiere control especial",
    },
    timestamps: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "materias_prima",
    timestamps: false,
  }
);
