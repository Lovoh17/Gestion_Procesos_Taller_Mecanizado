//AQUI HAGAN LAS ASOCIASIONES DE LOS MODELOS

import { Usuario } from '../../modules/Usuario/Usuario';
import { TelefonoUsuario } from '../../modules/Telefono_Usuario/Telefono_Usuario';
import { MateriaPrima } from '../../modules/Materia_Prima/Materia_Prima';
import { Zona } from '../../modules/Zona/Zona'; //Si no existe, crearla

import { HistorialMovimientoStock } from '../../modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.js';
import { Plano } from '../../modules/Plano/Plano.js';
import { PlanoMaterial } from '../../modules/Plano_Material/Plano_Material.js';
import { PlanoHerramienta } from '../../modules/Plano_Herramienta/Plano_Herramienta.js';


Usuario.hasMany(TelefonoUsuario, {
  foreignKey: 'id_usuario',
  as: 'telefonos'
});

TelefonoUsuario.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

Usuario.belongsTo(Zona, {
  foreignKey: 'id_zona',
  as: 'zona'
});

Zona.hasMany(Usuario, {
  foreignKey: 'id_zona',
  as: 'usuarios'
});
  
HistorialMovimientoStock.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
HistorialMovimientoStock.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id' });
HistorialMovimientoStock.belongsTo(TipoStock, { foreignKey: 'origen_stock_id', as: 'origenStock' });
HistorialMovimientoStock.belongsTo(TipoStock, { foreignKey: 'destino_stock_id', as: 'destinoStock' });
HistorialMovimientoStock.belongsTo(Pedido, { foreignKey: 'pedido_id' });
HistorialMovimientoStock.belongsTo(PedidoMaterial, { foreignKey: 'pedido_material_id' });
HistorialMovimientoStock.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Plano.belongsTo(Usuario, { foreignKey: 'creado_por' });
Plano.belongsTo(TipoPedido, { foreignKey: 'tipo_pedidos_id' });
Plano.hasMany(PlanoMaterial, { foreignKey: 'plano_id' });
Plano.hasMany(PlanoHerramienta, { foreignKey: 'plano_id' });

PlanoMaterial.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoMaterial.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
PlanoMaterial.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PlanoMaterial.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id' });

PlanoHerramienta.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoHerramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });


module.exports = {
  Usuario,
  TelefonoUsuario,
  MateriaPrima,
  Herramienta,
  Zona,
  HistorialMovimientoStock,
  Plano,
  PlanoMaterial,
  PlanoHerramienta
};
