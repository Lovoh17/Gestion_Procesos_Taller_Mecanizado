import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Herramienta } from "../Herramienta/Herramienta.js";
import { Usuario } from "../Usuario/Usuario.js";

export const Reserva_Herramienta = sequelize.define("reservas_herramientas", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    herramienta_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Herramienta,
            key: "id"
        }
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: "id"
        }
    },
    fecha_reserva:{
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_devolucion:{
        type: DataTypes.DATE,
        allowNull: false
    },
    estado:{
        type: DataTypes.ENUM("reservado", "cancelado", "completado"),
        allowNull: false
    }
},{
    timestamps: true,
    tableName: "reservas_herramientas"
})