import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Tipo_Pedido = sequelize.define("tipo_pedidos", {
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
    requiere_aprobacion:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
},{
    timestamps: false,
    tableName: 'tipo_pedidos'
});