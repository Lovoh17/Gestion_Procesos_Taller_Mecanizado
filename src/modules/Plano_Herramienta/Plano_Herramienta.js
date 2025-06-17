import { sequelize } from '../../shared/database/database.js';
import { DataTypes } from 'sequelize';

export const PlanoHerramienta = sequelize.define('plano_herramientas', {
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
    herramienta_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { 
            model: "herramientas", 
            key: "id"
        }
    },
    cantidad_necesaria: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },    
    tiempo_estimado_uso: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        comment: 'Horas estimadas de uso (trigger a herramienta)'
    },
    notas: { 
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
  timestamps: false,
  tableName: 'plano_herramientas'
});