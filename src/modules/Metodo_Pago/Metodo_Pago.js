import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Metodo_Pago = sequelize.define("metodo_pago",{
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
    requiere_referencia:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    tableName: "metodo_pago",
    timestamps: false
});