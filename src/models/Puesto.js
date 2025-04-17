import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

export const Puesto = sequelize.define('puestos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_puesto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel_jerarquico:{
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    es_supervisor:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: 'puestos'
})