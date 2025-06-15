// ASOCIASIONES DE MODELOS

import { Usuario } from '../../modules/Usuario/Usuario.js';
import { Telefono_Usuario } from '../../modules/Telefono_Usuario/Telefono_Usuario.js';
import { Materia_Prima } from '../../modules/Materia_Prima/Materia_Prima.js';
import { Herramienta } from '../../modules/Herramienta/Herramienta.js';

// AYALA
import { HistorialMovimientoStock } from '../../modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.js';
import { Plano } from '../../modules/Plano/Plano.js';
import { PlanoMaterial } from '../../modules/Plano_Material/Plano_Material.js';
import { PlanoHerramienta } from '../../modules/Plano_Herramienta/Plano_Herramienta.js';

import { Mantenimiento } from '../../modules/Mantenimiento/Mantenimiento.js';
import { Estado_Mantenimiento } from '../../modules/Estado_Mantenimiento/Estado_Mantenimiento.js';
import { Prioridad_Mantenimiento } from '../../modules/Prioridad_Mantenimiento/Prioridad_Mantenimiento.js';
import { Tipo_Mantenimiento } from '../../modules/Tipo_Mantenimiento/Tipo_Mantenimiento.js';
import { Alerta_Reparacion } from '../../modules/Alerta_Reparacion/Alerta_Reparacion.js';

import { Estado_Reparacion } from '../../modules/Estado_Reparacion/Estado_Reparacion.js';
import { Tipos_Alertas } from '../../modules/Tipos_Alertas/Tipos_Alertas.js';

import { Historial_Uso_Herramienta } from '../../modules/Historial_Uso_Herramienta/Historial_Uso_Herramienta.js';
import { Pedido_Material } from '../../modules/Pedido_Material/Pedido_Material.js';
import { Pedido_Herramienta } from '../../modules/Pedido_Herramienta/Pedido_Herramienta.js';
import { Entrega_Pedido } from '../../modules/Entrega_Pedidio/Entrega_Pedido.js';
import { Detalle_Entrega } from '../../modules/Detalle_Entrega/Detalle_Entrega.js';
import { Historial_Pedido } from '../../modules/Historial_Pedido/Historial_Pedido.js';
import { Transaccion_Financiera } from '../../modules/Transaccion_Financiera/Transaccion_Financiera.js';
import { Detalle_Transaccion } from '../../modules/Detalle_Transaccion/Detalle_Transaccion.js';

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

import { Usuarios_Roles } from '../../modules/Usuarios_Roles/Usuarios_Roles.js';
import { Permisos } from '../../modules/Permisos/Permisos.js';
import { Rol } from '../../modules/Rol/Rol.js';
//import { Estado_Reparacion } from '../../modules/Estado_Reparacion/Estado_Reparacion.js';
//import { Tipos_Alertas } from '../../modules/Tipos_Alertas/Tipos_Alertas.js';
import { Estados_Devolucion } from '../../modules/Estados_Devolucion/Estado_Devolucion.js';
import { Estado_Pedido } from '../../modules/Estados_Pedido/Estados_Pedido.js';
import { Estado_Entrega } from '../../modules/Estado_Entrega/Estado_Entrega.js';
import { Razones_Pausa_Pedido } from '../../modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.js';
import { Departamento_Universidad } from '../../modules/Departamentos_Universidad/Departamentos_Universidad.js';
import { Estado_Transaccion } from '../../modules/Estado_Transaccion/Estado_Transaccion.js';
import { Metodo_Pago } from '../../modules/Metodo_Pago/Metodo_Pago.js';
import { Tipos_Transaccion } from '../../modules/Tipos_Transaccion/Tipos_Transaccion.js';



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

Mantenimiento.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Mantenimiento.belongsTo(Tipo_Mantenimiento, { foreignKey: 'tipo_mantenimiento_id' });
Mantenimiento.belongsTo(Estado_Mantenimiento, { foreignKey: 'estado_id' });
Mantenimiento.belongsTo(Prioridad_Mantenimiento, { foreignKey: 'prioridad_id' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'tecnico_asignado_id', as: 'tecnicoAsignado' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'mantenimiento_hecho_por', as: 'hechoPor' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'actualizado_por', as: 'actualizadoPor' });

Alerta_Reparacion.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Alerta_Reparacion.belongsTo(Tipos_Alertas, { foreignKey: 'tipo_alerta_id' });
Alerta_Reparacion.belongsTo(Prioridad_Mantenimiento, { foreignKey: 'prioridad_id' });
Alerta_Reparacion.belongsTo(Estado_Reparacion, { foreignKey: 'estado_reparacion' });
Alerta_Reparacion.belongsTo(Usuario, { foreignKey: 'resuelta_por', as: 'usuarioResuelve' });

Historial_Uso_Herramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Historial_Uso_Herramienta.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Historial_Uso_Herramienta.belongsTo(Pedido, { foreignKey: 'proyecto_id' });
Historial_Uso_Herramienta.belongsTo(Estado_Herramienta, { foreignKey: 'estado_devolucion_id' });
Historial_Uso_Herramienta.belongsTo(Usuario, { foreignKey: 'aprobado_por', as: 'usuarioAprueba' });

Pedido_Material.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido_Material.belongsTo(Materia_Prima, { foreignKey: 'material_id' });
Pedido_Material.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });
Pedido_Material.belongsTo(Tipo_Stock, { foreignKey: 'tipo_stock_destino' });
Pedido_Material.belongsTo(Estado_Entrega, { foreignKey: 'estado_entrega_id' });

Pedido_Herramienta.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido_Herramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Pedido_Herramienta.belongsTo(Estado_Herramienta, { foreignKey: 'estado_herramienta_id' });

Entrega_Pedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Entrega_Pedido.belongsTo(Usuario, { foreignKey: 'entregado_por', as: 'usuarioEntrega' });
Entrega_Pedido.belongsTo(Usuario, { foreignKey: 'recibido_por', as: 'usuarioRecibe' });
Entrega_Pedido.belongsTo(Estado_Entrega, { foreignKey: 'estado_entrega_id' });

Detalle_Entrega.belongsTo(Entrega_Pedido, { foreignKey: 'entrega_id' });
Detalle_Entrega.belongsTo(Materia_Prima, { foreignKey: 'material_id' });
Detalle_Entrega.belongsTo(Pedido_Material, { foreignKey: 'pedido_material_id' });
Detalle_Entrega.belongsTo(Unidad_Medida, { foreignKey: 'unidad_medida_id' });

Historial_Pedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Historial_Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Historial_Pedido.belongsTo(Estado_Pedido, { foreignKey: 'estado_anterior_id', as: 'estadoAnterior' });
Historial_Pedido.belongsTo(Estado_Pedido, { foreignKey: 'estado_nuevo_id', as: 'estadoNuevo' });
Historial_Pedido.belongsTo(Razon_Pausa_Pedido, { foreignKey: 'razon_pausa_id' });

Transaccion_Financiera.belongsTo(Tipo_Transaccion, { foreignKey: 'tipo_transaccion_id' });
Transaccion_Financiera.belongsTo(Departamento_Universidad, { foreignKey: 'departamento_id' });
Transaccion_Financiera.belongsTo(Estado_Transaccion, { foreignKey: 'estado_transaccion_id' });
Transaccion_Financiera.belongsTo(Usuario, { foreignKey: 'aprobado_por', as: 'usuarioAprueba' });
Transaccion_Financiera.belongsTo(Usuario, { foreignKey: 'creado_por', as: 'usuarioCrea' });
Transaccion_Financiera.belongsTo(Metodo_Pago, { foreignKey: 'metodo_pago_id' });

Detalle_Transaccion.belongsTo(Transaccion_Financiera, { foreignKey: 'transaccion_id' });
Transaccion_Financiera.hasMany(Detalle_Transaccion, { foreignKey: 'transaccion_id' });

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

Usuarios_Roles.belongsTo(Usuario,{ foreignKey: 'usuario_id'});
Usuarios_Roles.belongsTo(Rol, {foreignKey: 'role_id'});

Permisos.belongsTo(Rol, {foreignKey: 'role_id'});

