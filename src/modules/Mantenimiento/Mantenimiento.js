import { sequelize } from "../../shared/database/database";
import { DataTypes } from "sequelize";

export const Mantenimiento = sequelize.define("mantenimientos", {
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
  tipo_mantenimiento_id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "tipo_mantenimientos",
      key: "id",
    },
  },
  fecha_programada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "estado_mantenimiento",
      key: "id",
    },
  },
  prioridad_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "prioridad_mantenimiento",
      key: "id",
    },
  },
  costo_estimado: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  costo_real: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  tecnico_asignado_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  descripcion_problema: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  acciones_realizadas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  repuestos_utilizados: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: "Lista de repuestos y materiales usados",
  },
  horas_trabajo: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  mantenimiento_hecho_por: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  actualizado_por: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "mantenimientos",
});