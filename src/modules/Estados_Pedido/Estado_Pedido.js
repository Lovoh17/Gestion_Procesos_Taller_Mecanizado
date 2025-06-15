import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"

export const EstadoPedido = sequelize.define("Estado_pedido",{
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
    tableName: "estados_pedido",
    timestamps: false,
});