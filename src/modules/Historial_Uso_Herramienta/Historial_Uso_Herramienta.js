import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const Historial_Uso_Herramienta = sequelize.define("historial_uso_herramientas", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  herramienta_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "herramientas",
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
  proyecto_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "pedidos",
      key: "id",
    },
  },
  fecha_uso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_devolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  horas_utilizada: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  estado_devolucion_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "estados_devolucion",
      key: "id",
    },
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  aprobado_por: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
}, {
  timestamps: false,
  tableName: "historial_uso_herramientas",
});