//AQUI HAGAN LAS ASOCIASIONES DE LOS MODELOS

import { Usuario } from '../../modules/Usuario/Usuario.js';
import { Telefono_Usuario } from '../../modules/Telefono_Usuario/Telefono_Usuario.js';
import { MateriaPrima } from '../../modules/Materia_Prima/Materia_Prima.js';

import { HistorialMovimientoStock } from '../../modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.js';
import { Plano } from '../../modules/Plano/Plano.js';
import { PlanoMaterial } from '../../modules/Plano_Material/Plano_Material.js';
import { PlanoHerramienta } from '../../modules/Plano_Herramienta/Plano_Herramienta.js';
import { Herramienta } from '../../modules/Herramienta/Herramienta.js';
import { Tipo_Pedido } from '../../modules/Tipo_Pedido/Tipo_Pedido.js';
import { Tipo_Stock } from '../../modules/Tipo_Stock/Tipo_Stock.js';
import { Unidad_Medida } from '../../modules/Unidad_Medida/Unidad_Medida.js';
//import { Pedido } from '../../modules/Pedido/Pedido.js';
//import { Pedido_Material } from '../../modules/Pedido_Material/Pedido_Material.js';




Usuario.hasMany(Telefono_Usuario, {
  foreignKey: 'id_usuario',
  as: 'telefonos'
});

Telefono_Usuario.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

/*Usuario.belongsTo(Zona, {
  foreignKey: 'id_zona',
  as: 'zona'
});*/

/*Zona.hasMany(Usuario, {
  foreignKey: 'id_zona',
  as: 'usuarios'
});*/
  
HistorialMovimientoStock.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
HistorialMovimientoStock.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });
HistorialMovimientoStock.belongsTo(Tipo_Stock, { foreignKey: 'origen_stock_id', as: 'origenStock' });
HistorialMovimientoStock.belongsTo(Tipo_Stock, { foreignKey: 'destino_stock_id', as: 'destinoStock' });
//HistorialMovimientoStock.belongsTo(Pedido, { foreignKey: 'pedido_id' });
//HistorialMovimientoStock.belongsTo(PedidoMaterial, { foreignKey: 'pedido_material_id' });
HistorialMovimientoStock.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Plano.belongsTo(Usuario, { foreignKey: 'creado_por' });
Plano.belongsTo(Tipo_Pedido, { foreignKey: 'tipo_pedidos_id' });
Plano.hasMany(PlanoMaterial, { foreignKey: 'plano_id' });
Plano.hasMany(PlanoHerramienta, { foreignKey: 'plano_id' });

PlanoMaterial.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoMaterial.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
//PlanoMaterial.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PlanoMaterial.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });

PlanoHerramienta.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoHerramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
