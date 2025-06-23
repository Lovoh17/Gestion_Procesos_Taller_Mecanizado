import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";

export const TelefonoUsuario = sequelize.define("telefonos_usuario",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
<<<<<<< HEAD
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    tipo_telefono_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "tipos_telefono",
        key: "id",
      },
=======
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references:{
          model: Usuario,
          key: 'id'
        }
    },
    tipo_telefono_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: Tipo_Telefono,
          key: 'id'
        }
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    es_principal: {
      type: DataTypes.BOOLEAN,
<<<<<<< HEAD
      allowNull: false,
    },
=======
      defaultValue: true,
    }
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
  },
  {
    tableName: "telefonos_usuario",
    timestamps: false,
  }
);