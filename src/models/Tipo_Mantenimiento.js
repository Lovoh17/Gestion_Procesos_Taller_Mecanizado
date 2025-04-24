import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Tipo_Mantenimiento = sequelize.define("tipo_mantenimientos", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    frecuencia_recomendada_dias:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requiere_aprobacion:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nivel_tecnico_requerido:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'tipo_mantenimientos'
})