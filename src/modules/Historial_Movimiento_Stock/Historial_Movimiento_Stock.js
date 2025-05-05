import { sequelize } from '../../shared/database/database.js';
import { DataTypes } from 'sequelize';

// Importe de los modelos necesarios
import { MateriaPrima } from '../Materia_Prima/Materia_Prima.js';
import { UnidadMedida } from '../Unidad_Medida/Unidad_Medida.js';
import { TipoStock } from '../Tipo_Stock/Tipo_Stock.js';
import { Pedido } from '../Pedido/Pedido.js'; // No implementado o no definido
import { PedidoMaterial } from '../Pedido_Material/Pedido_Material.js'; // No implementado o no definido
import { Usuario } from '../Usuario/Usuario.js';


export const HistorialMovimientoStock = sequelize.define('historial_movimientos_stock', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    material_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        refereces: {
            model: MateriaPrima,
            key: 'id_mp'
        }
    },
    cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    unidad_medida_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        refereces: {
            model: UnidadMedida,
            key: 'id'
        }
    },
    origen_stock_id: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        refereces: {
            model: TipoStock,
            key: 'id'
        }
    },
    destino_stock_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        refereces: {
            model: TipoStock,
            key: 'id'
        }
    },
    pedido_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        refereces: {
            model: Pedido,
            key: 'id'
        }
    },
    pedido_material_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        refereces: {
            model: PedidoMaterial,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        refereces: {
            model: Usuario,
            key: 'id'
        }
    },
    fecha_movimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo_movimiento: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Entrada, uso, mover de stock general a interno o externo o viceversa'
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documento_referencia: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'historial_movimientos_stock'
});

