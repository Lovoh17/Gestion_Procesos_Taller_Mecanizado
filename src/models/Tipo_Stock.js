import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

export const Tipo_Stock = sequelize.define('tipos_stock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    es_exclusivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'tipos_stock'
})