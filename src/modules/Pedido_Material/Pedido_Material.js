import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Pedido_Material = sequelize.define("pedido_materiales", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  pedido_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "pedidos",
      key: "id",
    },
  },
  material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "materias_prima",
      key: "id",
    },
  },
  cantidad_solicitada: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  cantidad_aprobada: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  cantidad_entregada: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },
  cantidad_devuelta: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: "Material dañado",
  },
  unidad_medida_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "unidades_medida",
      key: "id",
    },
  },
  estado_entrega_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "estado_entrega",
      key: "id",
    },
  },
  tipo_stock_destino: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "tipos_stock",
      key: "id",
    },
  },
  costo_unitario: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: "Snapshot al momento del pedido",
  },
  desperdicio_estimado: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },
  desperdicio_real: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "pedido_materiales",
});