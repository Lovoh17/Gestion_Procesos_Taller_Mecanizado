import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";


export const PlanoMaterial = sequelize.define("plano_materiales", {
  id: { 
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true 
  },
  plano_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { 
      model: "planos",
      key: "id"
    }
  },
  material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { 
      model: "materia_prima", 
      key: "id"
    }
  },
  cantidad: { 
    type: DataTypes.DECIMAL, 
    allowNull: false 
  },
  cantidad_extra: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: "cantidad extra por fallos, genera trigger a stock"
  },
  unidad_medida_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { 
      model: "unidades_medida", 
      key: "id"
    }
  },
  notas: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  desperdicio_estimado: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    comment: "Porcentaje de desperdicio esperado, no reutilizable"
  }
}, {
  timestamps: false,
  tableName: "plano_materiales"
});