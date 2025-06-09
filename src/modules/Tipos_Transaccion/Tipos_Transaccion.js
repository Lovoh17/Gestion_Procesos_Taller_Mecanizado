import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Tipos_Transaccion = sequelize.define("tipos_transaccion",{
    id:{
        type: DataTypes.BIGINT,
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
    afecta_ingresos:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    afecta_gastos:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    es_interno:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    tableName: "tipos_transaccion",
    timestamps: false
})