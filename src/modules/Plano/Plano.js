import { sequelize } from '../../shared/database/database.js';
import { DataTypes } from 'sequelize';

import { Tipo_Pedido } from '../Tipo_Pedido/Tipo_Pedido.js';
import { Usuario } from '../Usuario/Usuario.js';

export const Plano = sequelize.define('planos', {
    id: {
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT 
    },
    version: { 
        type: DataTypes.STRING 
    },
    notas: { 
        type: DataTypes.TEXT 
    },
    tipo_pedidos_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Tipo_Pedido,
            key: 'id'
        }
    },
    creado_por: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'borrador, aprobado, obsoleto'
    },
    archivo_ruta: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Ruta del archivo CAD/diseño'
    },
    timestamp: { 
        type: DataTypes.DATE, 
        allowNull: false 
    }
}, {
  timestamps: false,
  tableName: 'planos'
});
