import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Entrega_Pedido = sequelize.define("entregas_pedidos", {
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
  entrega_numero: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: "Número de entrega para entregas parciales",
  },
  entregado_por: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  recibido_por: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ubicacion_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_entrega_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "estado_entrega",
      key: "id",
    },
  },
  metodo_transporte: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documento_entrega: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Ruta del documento firmado",
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "entregas_pedidos",
});