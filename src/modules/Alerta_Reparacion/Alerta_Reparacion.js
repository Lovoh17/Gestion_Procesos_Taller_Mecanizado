import { sequelize } from "../../shared/database/database";
import { DataTypes } from "sequelize";

export const Alerta_Reparacion = sequelize.define("alertas_reparacion", {
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
  tipo_alerta_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "tipos_alertas",
      key: "id",
    },
  },
  fecha_generacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  fecha_limite: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  prioridad_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "prioridad_mantenimiento",
      key: "id",
    },
  },
  estado_reparacion: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "estado_reparacion",
      key: "id",
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resuelta_por: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_resolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "alertas_reparacion",
});