import express from 'express';
import cors from 'cors';

import AlertaReparacionRoutes from './modules/Alerta_Reparacion/Alerta_Reparacion.routes.js';
import DepartamentosUniversidadRoutes from './modules/Departamentos_Universidad/Departamentos_Universidad.routes.js';
import DetalleEntregaRoutes from './modules/Detalle_Entrega/Detalle_Entrega.routes.js';
import DetalleTransaccionRoutes from './modules/Detalle_Transaccion/Detalle_Transaccion.routes.js';
import EntregaPedidoRoutes from './modules/Entrega_Pedidio/Entrega_Pedido.routes.js'; //---------
import EstadoEntregaRoutes from './modules/Estado_Entrega/Estado_Entrega.routes.js';
import EstadoHerramientaRoutes from './modules/Estado_Herramienta/Estado_Herramienta.routes.js';
import EstadoMantenimientoRoutes from './modules/Estado_Mantenimiento/Estado_Mantenimiento.routes.js';
import EstadoReparacionRoutes from './modules/Estado_Reparacion/Estado_Reparacion.routes.js';
import EstadoTransaccionRoutes from './modules/Estado_Transaccion/Estado_Transaccion.routes.js';
import EstadoUsuarioRoutes from './modules/Estado_Usuario/Estado_Usuario.routes.js';
import EstadosDevolucionRoutes from './modules/Estados_Devolucion/Estado_Devoluvion.routes.js';
import EstadosPedidosRoutes from './modules/Estados_Pedido/Estado_Pedido.routes.js';
import HerramientaRoutes from './modules/Herramienta/Herramienta.routes.js';
import HistorialMovimientoStockRoutes from './modules/Historial_Movimiento_Stock/Historial_Movimiento_Stock.routes.js';
import HistorialPedidoRoutes from './modules/Historial_Pedido/Historial_Pedido.routes.js';
import HistorialUsoHerramientaRoutes from './modules/Historial_Uso_Herramienta/Historial_Uso_Herramienta.routes.js';
import MantenimientoRoutes from './modules/Mantenimiento/Mantenimiento.routes.js';
import MateriaPrimaRoutes from './modules/Materia_Prima/Materia_Prima.routes.js';
import MetodoPagoRoutes from './modules/Metodo_Pago/Metodo_Pago.routes.js';
import PedidoRoutes from './modules/Pedido/Pedido.routes.js';
import PedidoHerramientaRoutes from './modules/Pedido_Herramienta/Pedido_Herramienta.routes.js';
import PedidoMaterialRoutes from './modules/Pedido_Material/Pedido_Material.routes.js';
import PermisoRoutes from './modules/Permisos/Permisos.routes.js';
import PlanoRoutes from './modules/Plano/Plano.routes.js';
import PlanoHerramientaRoutes from './modules/Plano_Herramienta/Plano_Herramienta.routes.js';
import PlanoMaterialRoutes from './modules/Plano_Material/Plano_Material.routes.js';
import PrioridadMantenimientoRoutes from './modules/Prioridad_Mantenimiento/Prioridad_Mantenimiento.routes.js';
import PuestoRoutes from './modules/Puesto/Puesto.routes.js';
import RazonesPausaPedidoRoutes from './modules/Razones_Pausa_Pedido/Razones_Pausa_Pedido.routes.js';
import RolRoutes from './modules/Rol/Rol.routes.js';
import TelefonoUsuarioRoutes from './modules/Telefono_Usuario/Telefono_Usuario.routes.js';
import TipoHerramientaRoutes from './modules/Tipo_Herramienta/Tipo_Herramienta.routes.js';
import TipoMantenimientoRoutes from './modules/Tipo_Mantenimiento/Tipo_Mantenimiento.routes.js';
import TipoMateriaPrimaRoutes from './modules/Tipo_Materia_Prima/Tipo_Materia_Prima.routes.js';
import TipoPedidoRoutes from './modules/Tipo_Pedido/Tipo_Pedido.routes.js';
import TipoStockRoutes from './modules/Tipo_Stock/Tipo_Stock.routes.js';
import TipoTelefonoRoutes from './modules/Tipo_Telefono/Tipo_Telefono.routes.js';
import TiposAlertasRoutes from './modules/Tipos_Alertas/Tipos_Alertas.routes.js';
import TiposTransaccionRoutes from './modules/Tipos_Transaccion/Tipos_Transaccion.routes.js';
import TransaccionFinancieraRoutes from './modules/Transaccion_Financiera/Transaccion_Financiera.routes.js';
import Turno from './modules/Turno/Turno.routes.js';
import UnidadMedidaRoutes from './modules/Unidad_Medida/Unidad_Medida.routes.js';
import UsuarioRoutes from './modules/Usuario/Usuario.routes.js';
import UsuarioRolesRoutes from './modules/Usuarios_Roles/Usuarios_Roles.routes.js';
import ZonaTrabajoRoutes from './modules/Zona_Trabajo/Zona_Trabajo.routes.js';
import AuthRoutes from './modules/Auth/Auth.routes.js';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(AlertaReparacionRoutes);
app.use(DepartamentosUniversidadRoutes);
app.use(DetalleEntregaRoutes);
app.use(DetalleTransaccionRoutes);
app.use(EntregaPedidoRoutes);
app.use(EstadoEntregaRoutes);
app.use(EstadoHerramientaRoutes);
app.use(EstadoMantenimientoRoutes);
app.use(EstadoReparacionRoutes);
app.use(EstadoTransaccionRoutes);
app.use(EstadoUsuarioRoutes);
app.use(EstadosDevolucionRoutes);
app.use(EstadosPedidosRoutes);
app.use(HerramientaRoutes);
app.use(HistorialMovimientoStockRoutes);
app.use(HistorialPedidoRoutes);
app.use(HistorialUsoHerramientaRoutes);
app.use(MantenimientoRoutes);
app.use(MateriaPrimaRoutes);
app.use(MetodoPagoRoutes);
app.use(PedidoRoutes);
app.use(PedidoHerramientaRoutes);
app.use(PedidoMaterialRoutes);
app.use(PermisoRoutes);
app.use(PlanoRoutes);
app.use(PlanoHerramientaRoutes);
app.use(PlanoMaterialRoutes);
app.use(PrioridadMantenimientoRoutes);
app.use(PuestoRoutes);
app.use(RazonesPausaPedidoRoutes);
app.use(RolRoutes);
app.use(TelefonoUsuarioRoutes);
app.use(TipoHerramientaRoutes);
app.use(TipoMantenimientoRoutes);
app.use(TipoMateriaPrimaRoutes);
app.use(TipoPedidoRoutes);
app.use(TipoStockRoutes);
app.use(TipoTelefonoRoutes);
app.use(TiposAlertasRoutes);
app.use(TiposTransaccionRoutes);
app.use(TransaccionFinancieraRoutes);
app.use(Turno);
app.use(UnidadMedidaRoutes);
app.use(UsuarioRoutes);
app.use(UsuarioRolesRoutes);
app.use(ZonaTrabajoRoutes);
app.use(AuthRoutes);

export default app;