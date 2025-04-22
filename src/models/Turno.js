import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

export const Turno = sequelize.define('turnos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    hora_inicio:{
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin:{
        type: DataTypes.TIME,
        allowNull: false
    },
    dias_semana:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'turnos'
})
