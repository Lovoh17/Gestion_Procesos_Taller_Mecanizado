import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "../Usuario/Usuario.js";
import { Herramienta } from "../Herramienta/Herramienta.js";

export const CheckoutHerramienta= sequelize.define(
    "checkoutHerramienta",
    {
        id:{
            type:DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        herramienta_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: Herramienta,
                key: 'id'
            }
        },
        usuario_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: Usuario,
                key: 'id'
            }
        },
        hora_de_check: {
            type: DataTypes.DATE,
            allowNull: false
        },
        delete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: "checkoutHerramienta",
        timestamps: false,
    }
);
