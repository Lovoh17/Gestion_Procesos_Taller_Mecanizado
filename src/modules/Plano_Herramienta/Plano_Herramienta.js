import { sequelize } from '../../shared/database/database.js';
import { DataTypes } from 'sequelize';

import { Plano } from '../../modules/Plano/Plano.js';
import { Herramienta } from '../Herramienta/Herramienta.js';

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
            model: Plano,
            key: 'id' }
    },
    herramienta_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { 
            model: Herramienta, 
            key: 'id' }
    },
    cantidad_necesaria: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },    
    tiempo_estimado_uso: {
        type: DataTypes.DECIMAL,
        comment: 'Horas estimadas de uso (trigger a herramienta)'
    },
    notas: { 
        type: DataTypes.TEXT
    }
}, {
  timestamps: false,
  tableName: 'plano_herramientas'
});
