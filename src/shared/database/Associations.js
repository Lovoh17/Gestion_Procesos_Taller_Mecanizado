// ASOCIASIONES DE MODELOS

import { Usuario } from '../../modules/Usuario/Usuario.js';
import { Telefono_Usuario } from '../../modules/Telefono_Usuario/Telefono_Usuario.js';
import { Materia_Prima } from '../../modules/Materia_Prima/Materia_Prima.js';
import { Herramienta } from '../../modules/Herramienta/Herramienta.js';

import { HistorialMovimientoStock } from '../../modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.js';
import { Plano } from '../../modules/Plano/Plano.js';
import { PlanoMaterial } from '../../modules/Plano_Material/Plano_Material.js';
import { PlanoHerramienta } from '../../modules/Plano_Herramienta/Plano_Herramienta.js';

import { Tipo_Pedido } from '../../modules/Tipo_Pedido/Tipo_Pedido.js';
import { Tipo_Stock } from '../../modules/Tipo_Stock/Tipo_Stock.js';
import { Unidad_Medida } from '../../modules/Unidad_Medida/Unidad_Medida.js';

import { Pedido } from '../../modules/Pedido/Pedido.js';
import { Tipo_Herramienta } from '../../modules/Tipo_Herramienta/Tipo_Herramienta.js';
import { Estado_Herramienta } from '../../modules/Estado_Herramienta/Estado_Herramienta.js';
import { Zona_Trabajo } from '../../modules/Zona_Trabajo/Zona_Trabajo.js';
import { Puesto } from '../../modules/Puesto/Puesto.js';
import { Estado_Usuario } from '../../modules/Estado_Usuario/Estado_Usuario.js';
import { Turno } from '../../modules/Turno/Turno.js';
import { Tipo_Telefono } from '../../modules/Tipo_Telefono/Tipo_Telefono.js';
import { Tipo_Materia_Prima } from '../../modules/Tipo_Materia_Prima/Tipo_Materia_Prima.js';
//import { Pedido_Material } from '../../modules/Pedido_Material/Pedido_Material.js';
//import { Pedido_Herramienta } from '../../modules/Pedido_Herramienta/Pedido_Herramienta.js';

/*
Usuario.hasMany(Telefono_Usuario, {
  foreignKey: 'id_usuario',
  as: 'telefonos'
});

Telefono_Usuario.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});
*/
/*Usuario.belongsTo(Zona, {
  foreignKey: 'id_zona',
  as: 'zona'
});*/

/*Zona.hasMany(Usuario, {
  foreignKey: 'id_zona',
  as: 'usuarios'
});*/
  
HistorialMovimientoStock.belongsTo(Materia_Prima, { foreignKey: 'material_id' });
HistorialMovimientoStock.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });
HistorialMovimientoStock.belongsTo(Tipo_Stock, { foreignKey: 'origen_stock_id', as: 'origenStock' });
HistorialMovimientoStock.belongsTo(Tipo_Stock, { foreignKey: 'destino_stock_id', as: 'destinoStock' });
HistorialMovimientoStock.belongsTo(Pedido, { foreignKey: 'pedido_id' });
//HistorialMovimientoStock.belongsTo(Pedido_Material, { foreignKey: 'pedido_material_id' });
//HistorialMovimientoStock.belongsTo(Pedido_Herramienta, { foreignKey: 'pedido_herramienta_id' });
HistorialMovimientoStock.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Plano.belongsTo(Usuario, { foreignKey: 'creado_por' });
Plano.belongsTo(Tipo_Pedido, { foreignKey: 'tipo_pedidos_id' });
Plano.hasMany(PlanoMaterial, { foreignKey: 'plano_id' });
Plano.hasMany(PlanoHerramienta, { foreignKey: 'plano_id' });

PlanoMaterial.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoMaterial.belongsTo(Materia_Prima, { foreignKey: 'material_id' });
PlanoMaterial.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PlanoMaterial.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });
PlanoHerramienta.belongsTo(Plano, { foreignKey: 'plano_id' });
PlanoHerramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });

Pedido.belongsTo(Usuario, { foreignKey: 'solicitante_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'aprobador_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'supervisor_id' });
Pedido.belongsTo(Plano, { foreignKey: 'plano_id' });
Pedido.belongsTo(Tipo_Pedido, { foreignKey: 'tipo_pedido_id' });
Pedido.belongsTo(Estado_Pedido, { foreignKey: 'estado_id' });
Pedido.belongsTo(Razon_Pausa_Pedido, { foreignKey: 'razon_pausa_actual_id' });

Herramienta.belongsTo(Tipo_Herramienta,{foreignKey: 'tipo_herramienta_id'});
Herramienta.belongsTo(Estado_Herramienta, {foreignKey: 'estado_herramienta_id'});
Herramienta.belongsTo(Zona_Trabajo, { foreignKey: 'zonas_trabajo_id'});

Zona_Trabajo.belongsTo(Usuario, {foreignKey: 'responsable_id'});

Usuario.belongsTo(Puesto, {foreignKey: 'puesto_id'});
Usuario.belongsTo(Estado_Usuario , {foreignKey: 'estado_id'});
Usuario.belongsTo(Turno,{ foreignKey: 'turno_id'});
Usuario.belongsTo(Zona_Trabajo, {foreignKey: 'zona_trabajo_id'});

Telefono_Usuario.belongsTo(Usuario, {foreignKey: 'usuario_id'});
Telefono_Usuario.belongsTo(Tipo_Telefono, { foreignKey: 'tipo_telefono_id'});

Materia_Prima.belongsTo(Tipo_Materia_Prima, {foreignKey: 'tipo_materia_prima_id'});
Materia_Prima.belongsTo(Unidad_Medida, { foreignKey: 'unidad_base_id'});
Materia_Prima.belongsTo(Unidad_Medida, { foreignKey: 'fraccion_unidad_id'});
Materia_Prima.belongsTo(Tipo_Stock, { foreignKey: 'pertenece_a_stock_id'});



