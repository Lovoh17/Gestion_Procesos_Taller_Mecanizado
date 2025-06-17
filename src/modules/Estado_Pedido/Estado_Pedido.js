import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const Estado_Pedido = sequelize.define("estado_pedido",{
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
        type:DataTypes.STRING,
        allowNull: false
    },
    color_indicador:{
        type:DataTypes.STRING,
        allowNull:false
    },
    permite_edicion:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    orden_flujo:{
        type:DataTypes.SMALLINT,
        allowNull: false
    }
},
{
    tableName: "estado_pedido",
    timestamps: false,
});