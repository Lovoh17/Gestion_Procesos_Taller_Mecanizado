import { sequelize } from '../../shared/database/database.js';
import { DataTypes } from 'sequelize';

import { Plano } from '../Plano/Plano.js';
import { Materia_Prima } from '../Materia_Prima/Materia_Prima.js';
//import { Pedido } from '../Pedido/Pedido.js';
import { Unidad_Medida } from '../Unidad_Medida/Unidad_Medida.js';

export const PlanoMaterial = sequelize.define('plano_materiales', {
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
    material_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: Materia_Prima, key: 'id' }
    },
    /*pedido_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { 
            model: Pedido,
            key: 'id' },
            comment: 'A que pedido pertenece este plano'
    },*/
    cantidad: { 
        type: DataTypes.DECIMAL, 
        allowNull: false 
    },
    cantidad_extra: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: 'cantidad extra por fallos, genera trigger a stock'
    },
    unidad_medida_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { 
        model: Unidad_Medida, 
        key: 'id' }
    },
    notas: { 
        type: DataTypes.TEXT },
    desperdicio_estimado: 
    {
      type: DataTypes.DECIMAL,
      comment: 'Porcentaje de desperdicio esperado, no reutilizable'
    }
}, {
  timestamps: false,
  tableName: 'plano_materiales'
});
