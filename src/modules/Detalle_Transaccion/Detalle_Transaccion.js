import { sequelize } from "../../shared/database/database";
import { DataTypes } from "sequelize";

export const Detalle_Transaccion = sequelize.define("detalle_transaccion", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  transaccion_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "transacciones_financieras",
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  iva: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  concepto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: "detalle_transaccion",
});