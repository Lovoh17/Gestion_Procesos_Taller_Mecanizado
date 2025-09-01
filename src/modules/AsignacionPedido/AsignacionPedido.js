import { sequelize } from "../../shared/database/database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "../Usuario/Usuario.js";
import { Pedido } from "../Pedido/Pedido.js";

export const AsignacionPedido = sequelize.define("AsignacionPedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { model: Usuario, key: "id" }
  },
  pedidoId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { model: Pedido, key: "id" }
  },
  horasAsignadas: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "asignaciones_pedidos",
  timestamps: false
});