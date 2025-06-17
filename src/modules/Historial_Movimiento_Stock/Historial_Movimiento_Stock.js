import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const HistorialMovimientoStock = sequelize.define("historial_movimientos_stock", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "materia_prima",
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  unidad_medida_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "unidades_medida",
      key: "id",
    },
  },
  origen_stock_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "tipos_stock",
      key: "id",
    },
  },
  destino_stock_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "tipos_stock",
      key: "id",
    },
  },
  usuario_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_movimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo_movimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Entrada, uso, mover de stock general a interno o externo o viceversa",
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento_referencia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "historial_movimientos_stock",
});