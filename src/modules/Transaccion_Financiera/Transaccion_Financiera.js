import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Transaccion_Financiera = sequelize.define("transacciones_financieras", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_transaccion_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "tipos_transaccion",
      key: "id",
    },
  },
  departamento_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "departamentos_universidad",
      key: "id",
    },
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  monto_total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado_transaccion_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "estado_transaccion",
      key: "id",
    },
  },
  aprobado_por: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_aprobacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metodo_pago_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "metodo_pago",
      key: "id",
    },
  },
  referencia_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creado_por: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "transacciones_financieras",
});