import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const EstadoDevolucion = sequelize.define("estados_devolucion",{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_estado:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "estados_devolucion",
    timestamps: false
});