// ASOCIASIONES DE MODELOS

import { Usuario } from '../../modules/Usuario/Usuario.js';
import { TelefonoUsuario } from '../../modules/Telefono_Usuario/Telefono_Usuario.js';
import { MateriaPrima } from '../../modules/Materia_Prima/Materia_Prima.js';
import { Herramienta } from '../../modules/Herramienta/Herramienta.js';

// AYALA
import { HistorialMovimientoStock } from '../../modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.js';
import { Plano } from '../../modules/Plano/Plano.js';
import { PlanoMaterial } from '../../modules/Plano_Material/Plano_Material.js';
import { PlanoHerramienta } from '../../modules/Plano_Herramienta/Plano_Herramienta.js';

import { Mantenimiento } from '../../modules/Mantenimiento/Mantenimiento.js';
import { EstadoMantenimiento } from '../../modules/Estado_Mantenimiento/Estado_Mantenimiento.js';
import { PrioridadMantenimiento } from '../../modules/Prioridad_Mantenimiento/Prioridad_Mantenimiento.js';
import { TipoMantenimiento } from '../../modules/Tipo_Mantenimiento/Tipo_Mantenimiento.js';
import { Alerta_Reparacion } from '../../modules/Alerta_Reparacion/Alerta_Reparacion.js';

import { EstadoReparacion } from '../../modules/Estado_Reparacion/Estado_Reparacion.js';
import { TiposAlertas } from '../../modules/Tipos_Alertas/Tipos_Alertas.js';

import { HistorialUsoHerramienta } from '../../modules/Historial_Uso_Herramienta/Historial_Uso_Herramienta.js';
import { PedidoMaterial } from '../../modules/Pedido_Material/Pedido_Material.js';
import { PedidoHerramienta } from '../../modules/Pedido_Herramienta/Pedido_Herramienta.js';
import { EntregaPedido } from '../../modules/Entrega_Pedidio/Entrega_Pedido.js';
import { DetalleEntrega } from '../../modules/Detalle_Entrega/Detalle_Entrega.js';
import { HistorialPedido } from '../../modules/Historial_Pedido/Historial_Pedido.js';
import { TransaccionFinanciera } from '../../modules/Transaccion_Financiera/Transaccion_Financiera.js';
import { DetalleTransaccion } from '../../modules/Detalle_Transaccion/Detalle_Transaccion.js';

import { TipoPedido } from '../../modules/Tipo_Pedido/Tipo_Pedido.js';
import { TipoStock } from '../../modules/Tipo_Stock/Tipo_Stock.js';
import { UnidadMedida } from '../../modules/Unidad_Medida/Unidad_Medida.js';
import { Pedido } from '../../modules/Pedido/Pedido.js';
import { TipoHerramienta } from '../../modules/Tipo_Herramienta/Tipo_Herramienta.js';
import { EstadoHerramienta } from '../../modules/Estado_Herramienta/Estado_Herramienta.js';
import { ZonaTrabajo } from '../../modules/Zona_Trabajo/Zona_Trabajo.js';
import { Puesto } from '../../modules/Puesto/Puesto.js';
import { EstadoUsuario } from '../../modules/Estado_Usuario/Estado_Usuario.js';
import { Turno } from '../../modules/Turno/Turno.js';
import { TipoTelefono } from '../../modules/Tipo_Telefono/Tipo_Telefono.js';
import { TipoMateriaPrima } from '../../modules/Tipo_Materia_Prima/Tipo_Materia_Prima.js';

import { UsuariosRoles } from '../../modules/Usuarios_Roles/Usuarios_Roles.js';
import { Permisos } from '../../modules/Permisos/Permisos.js';
import { Rol } from '../../modules/Rol/Rol.js';
//import { EstadoReparacion } from '../../modules/Estado_Reparacion/Estado_Reparacion.js';
//import { TiposAlertas } from '../../modules/Tipos_Alertas/Tipos_Alertas.js';
import { EstadoDevolucion } from '../../modules/Estados_Devolucion/Estado_Devolucion.js';
import { EstadoPedido } from '../../modules/Estados_Pedido/Estado_Pedido.js';
import { EstadoEntrega } from '../../modules/Estado_Entrega/Estado_Entrega.js';
import { RazonesPausaPedido } from '../../modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.js';
import { DepartamentosUniversidad } from '../../modules/Departamentos_Universidad/Departamentos_Universidad.js';
import { EstadoTransaccion } from '../../modules/Estado_Transaccion/Estado_Transaccion.js';
import { MetodoPago } from '../../modules/Metodo_Pago/Metodo_Pago.js';
import { TiposTransaccion } from '../../modules/Tipos_Transaccion/Tipos_Transaccion.js';



//import { PedidoMaterial } from '../../modules/Pedido_Material/Pedido_Material.js';
//import { PedidoHerramienta } from '../../modules/Pedido_Herramienta/Pedido_Herramienta.js';

/*
Usuario.hasMany(TelefonoUsuario, {
  foreignKey: 'id_usuario',
  as: 'telefonos'
});

TelefonoUsuario.belongsTo(Usuario, {
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
  
HistorialMovimientoStock.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
HistorialMovimientoStock.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id' });
HistorialMovimientoStock.belongsTo(TipoStock, { foreignKey: 'origen_stock_id', as: 'origenStock' });
HistorialMovimientoStock.belongsTo(TipoStock, { foreignKey: 'destino_stock_id', as: 'destinoStock' });
HistorialMovimientoStock.belongsTo(Pedido, { foreignKey: 'pedido_id' });
//HistorialMovimientoStock.belongsTo(PedidoMaterial, { foreignKey: 'pedido_material_id' });
//HistorialMovimientoStock.belongsTo(PedidoHerramienta, { foreignKey: 'pedido_herramienta_id' });
HistorialMovimientoStock.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Mantenimiento.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Mantenimiento.belongsTo(TipoMantenimiento, { foreignKey: 'tipo_mantenimiento_id' });
Mantenimiento.belongsTo(EstadoMantenimiento, { foreignKey: 'estado_id' });
Mantenimiento.belongsTo(PrioridadMantenimiento, { foreignKey: 'prioridad_id' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'tecnico_asignado_id', as: 'tecnicoAsignado' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'mantenimiento_hecho_por', as: 'hechoPor' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'actualizado_por', as: 'actualizadoPor' });

Alerta_Reparacion.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
Alerta_Reparacion.belongsTo(TiposAlertas, { foreignKey: 'tipo_alerta_id' });
Alerta_Reparacion.belongsTo(PrioridadMantenimiento, { foreignKey: 'prioridad_id' });
Alerta_Reparacion.belongsTo(EstadoReparacion, { foreignKey: 'estado_reparacion' });
Alerta_Reparacion.belongsTo(Usuario, { foreignKey: 'resuelta_por', as: 'usuarioResuelve' });

HistorialUsoHerramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
HistorialUsoHerramienta.belongsTo(Usuario, { foreignKey: 'usuario_id' });
HistorialUsoHerramienta.belongsTo(Pedido, { foreignKey: 'proyecto_id' });
HistorialUsoHerramienta.belongsTo(EstadoHerramienta, { foreignKey: 'estado_devolucion_id' });
HistorialUsoHerramienta.belongsTo(Usuario, { foreignKey: 'aprobado_por', as: 'usuarioAprueba' });

PedidoMaterial.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PedidoMaterial.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
PedidoMaterial.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id' });
PedidoMaterial.belongsTo(TipoStock, { foreignKey: 'tipo_stock_destino' });
PedidoMaterial.belongsTo(EstadoEntrega, { foreignKey: 'estado_entrega_id' });

PedidoHerramienta.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PedidoHerramienta.belongsTo(Herramienta, { foreignKey: 'herramienta_id' });
PedidoHerramienta.belongsTo(EstadoHerramienta, { foreignKey: 'estado_herramienta_id' });

EntregaPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
EntregaPedido.belongsTo(Usuario, { foreignKey: 'entregado_por', as: 'usuarioEntrega' });
EntregaPedido.belongsTo(Usuario, { foreignKey: 'recibido_por', as: 'usuarioRecibe' });
EntregaPedido.belongsTo(EstadoEntrega, { foreignKey: 'estado_entrega_id' });

DetalleEntrega.belongsTo(EntregaPedido, { foreignKey: 'entrega_id' });
DetalleEntrega.belongsTo(MateriaPrima, { foreignKey: 'material_id' });
DetalleEntrega.belongsTo(PedidoMaterial, { foreignKey: 'pedido_material_id' });
DetalleEntrega.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id' });

HistorialPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
HistorialPedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });
HistorialPedido.belongsTo(EstadoPedido, { foreignKey: 'estado_anterior_id', as: 'estadoAnterior' });
HistorialPedido.belongsTo(EstadoPedido, { foreignKey: 'estado_nuevo_id', as: 'estadoNuevo' });
HistorialPedido.belongsTo(RazonesPausaPedido, { foreignKey: 'razon_pausa_id' });

TransaccionFinanciera.belongsTo(TiposTransaccion, { foreignKey: 'tipo_transaccion_id' });
TransaccionFinanciera.belongsTo(DepartamentosUniversidad, { foreignKey: 'departamento_id' });
TransaccionFinanciera.belongsTo(EstadoTransaccion, { foreignKey: 'estado_transaccion_id' });
TransaccionFinanciera.belongsTo(Usuario, { foreignKey: 'aprobado_por', as: 'usuarioAprueba' });
TransaccionFinanciera.belongsTo(Usuario, { foreignKey: 'creado_por', as: 'usuarioCrea' });
TransaccionFinanciera.belongsTo(MetodoPago, { foreignKey: 'metodo_pago_id' });

DetalleTransaccion.belongsTo(TransaccionFinanciera, { foreignKey: 'transaccion_id' });
TransaccionFinanciera.hasMany(DetalleTransaccion, { foreignKey: 'transaccion_id' });

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

Pedido.belongsTo(Usuario, { foreignKey: 'solicitante_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'aprobador_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'supervisor_id' });
Pedido.belongsTo(Plano, { foreignKey: 'plano_id' });
Pedido.belongsTo(TipoPedido, { foreignKey: 'tipo_pedido_id' });
Pedido.belongsTo(EstadoPedido, { foreignKey: 'estado_id' });
Pedido.belongsTo(RazonesPausaPedido, { foreignKey: 'razon_pausa_actual_id' });

Herramienta.belongsTo(TipoHerramienta,{foreignKey: 'tipo_herramienta_id'});
Herramienta.belongsTo(EstadoHerramienta, {foreignKey: 'estado_herramienta_id'});
Herramienta.belongsTo(ZonaTrabajo, { foreignKey: 'zonas_trabajo_id'});

ZonaTrabajo.belongsTo(Usuario, {foreignKey: 'responsable_id'});

Usuario.belongsTo(Puesto, {foreignKey: 'puesto_id'});
Usuario.belongsTo(EstadoUsuario , {foreignKey: 'estado_id'});
Usuario.belongsTo(Turno,{ foreignKey: 'turno_id'});
Usuario.belongsTo(ZonaTrabajo, {foreignKey: 'zona_trabajo_id'});

TelefonoUsuario.belongsTo(Usuario, {foreignKey: 'usuario_id'});
TelefonoUsuario.belongsTo(TipoTelefono, { foreignKey: 'tipo_telefono_id'});

MateriaPrima.belongsTo(TipoMateriaPrima, {foreignKey: 'tipo_materia_prima_id'});
MateriaPrima.belongsTo(UnidadMedida, { foreignKey: 'unidad_base_id'});
MateriaPrima.belongsTo(UnidadMedida, { foreignKey: 'fraccion_unidad_id'});
MateriaPrima.belongsTo(TipoStock, { foreignKey: 'pertenece_a_stock_id'});

UsuariosRoles.belongsTo(Usuario,{ foreignKey: 'usuario_id'});
UsuariosRoles.belongsTo(Rol, {foreignKey: 'role_id'});

Permisos.belongsTo(Rol, {foreignKey: 'role_id'});