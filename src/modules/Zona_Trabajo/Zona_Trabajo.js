import { DataTypes } from "sequelize"
import { sequelize } from "../../shared/database/database.js"
import { Usuario } from "../Usuario/Usuario.js"


export const Zona_Trabajo = sequelize.define("zonas_trabajo",{
    id:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:  "soldadura, corte, carpinnteria",
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    responsable_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        reference:{
            model: Usuario,
            key: 'id'
        }
    }
},
{
    tableName: "zonas_trabajo",
    timestamps: false,
})