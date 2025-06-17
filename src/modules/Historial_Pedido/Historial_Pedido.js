import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Historial_Pedido = sequelize.define("historial_pedidos", {
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
  usuario_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Creación, Aprobación, Pausa, Reanudación, Cancelación",
  },
  estado_anterior_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "Estado_pedido",
      key: "id",
    },
  },
  estado_nuevo_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "Estado_pedido",
      key: "id",
    },
  },
  razon_pausa_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "razon_pausa_pedido",
      key: "id",
    },
  },
  comentario_pausa: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_accion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_resolucion_estimada: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: "Para pausas, fecha estimada de reanudación",
  },
  cambios: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: "historial_pedidos",
});