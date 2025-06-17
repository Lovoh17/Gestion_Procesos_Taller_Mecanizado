import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Detalle_Entrega = sequelize.define("detalle_entregas", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  entrega_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "entregas_pedidos",
      key: "id",
    },
  },
  material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "materia_prima",
      key: "id",
    },
  },
  pedido_material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "pedido_materiales",
      key: "id",
    },
  },
  cantidad_entregada: {
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
  lote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion_destino: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Donde se debe almacenar en el taller",
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "detalle_entregas",
});