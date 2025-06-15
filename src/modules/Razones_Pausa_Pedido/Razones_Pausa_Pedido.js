import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const RazonesPausaPedido = sequelize.define("razones_pausa_pedido",{
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
    tableName: "razones_pausa_pedido",
    timestamps: false,
});