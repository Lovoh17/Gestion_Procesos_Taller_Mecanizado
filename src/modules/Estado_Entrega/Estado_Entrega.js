import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const EstadoEntrega = sequelize.define("estado_entrega",{
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
    }
},
{
    tableName: "estado_entrega",
    timestamps: false,
});