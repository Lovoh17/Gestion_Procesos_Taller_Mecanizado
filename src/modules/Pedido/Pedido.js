import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Pedido = sequelize.define("pedidos", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo_pedido: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  tipo_pedido_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "tipo_pedidos",
      key: "id",
    }
  },
  plano_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "planos",
      key: "id",
    }
  },
  solicitante_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  aprobador_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  supervisor_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
    comment: "quien sera el encargado del proyecto",
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_aprobacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fecha_requerida: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_estimada_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fecha_completado: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "estado_pedido",
      key: "id",
    },
  },
  pausado_desde: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pausado_hasta: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  razon_pausa_actual_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "razon_pausa_pedido",
      key: "id",
    },
  },
  contador_pausas: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    comment: "Número de veces que ha sido pausado",
  },
  tiempo_total_pausado: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    comment: "dias del pedido en estado de pausa",
  },
  prioridad: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 3,
  },
  proyecto_asociado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  costo_estimado: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  costo_real: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  precio_final: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isGreaterThanEstimated(value) {
        if (this.costo_estimado && value <= this.costo_estimado) {
          throw new Error("El precio final debe ser mayor que el costo estimado.");
        }
      },
    },
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  timestamps: false,
  tableName: "pedidos",
});