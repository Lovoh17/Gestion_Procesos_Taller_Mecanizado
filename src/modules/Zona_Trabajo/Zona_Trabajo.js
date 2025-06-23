import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/database/database.js";

export const Zona_Trabajo = sequelize.define("zonas_trabajo",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "soldadura, corte, carpinteria",
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    responsable_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
=======
    responsable_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id'
        }
    }
},
{
>>>>>>> 3bd2348280a13bfbbc821972e8359a9d3cd09150
    tableName: "zonas_trabajo",
    timestamps: false,
  }
);