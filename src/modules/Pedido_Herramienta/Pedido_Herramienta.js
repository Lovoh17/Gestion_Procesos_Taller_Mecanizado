import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Pedido_Herramienta = sequelize.define("pedido_herramientas", {
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
  herramienta_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "herramientas",
      key: "id",
    },
  },
  cantidad_solicitada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad_aprobada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad_asignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fecha_estimada_devolucion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_real_devolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado_herramienta_id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: "estado_herramienta",
      key: "id",
    },
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "pedido_herramientas",
});