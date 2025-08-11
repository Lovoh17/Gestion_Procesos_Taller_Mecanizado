-- SEEDER
INSERT INTO public.tipo_herramientas (id, nombre, descripcion, caracteristicas_clave) VALUES
(1, 'Soldadora MIG', 'Equipo para soldadura MIG/MAG', '{"voltaje": "220V", "amperaje": "140A", "peso": "15kg"}'),
(2, 'Soldadora TIG', 'Equipo para soldadura TIG', '{"voltaje": "220V", "amperaje": "200A", "peso": "20kg"}'),
(3, 'Esmeril Angular', 'Herramienta para corte y desbaste', '{"diámetro": "115mm", "potencia": "800W", "rpm": "11000"}'),
(4, 'Cortadora Plasma', 'Equipo para corte por plasma', '{"corte máximo": "12mm", "consumo": "30A", "peso": "25kg"}'),
(5, 'Soplete Oxicorte', 'Equipo para corte con oxígeno', '{"presión oxígeno": "8bar", "presión gas": "0.5bar", "peso": "3kg"}');

INSERT INTO public.estado_herramienta (id, nombre, descripcion, permiso_uso, color_indicador, requiere_autorizacion) VALUES
(1, 'Disponible', 'Herramienta en buen estado y disponible', true, 'verde', false),
(2, 'En uso', 'Herramienta actualmente en uso', false, 'amarillo', false),
(3, 'Mantenimiento', 'Herramienta en reparación o mantenimiento', false, 'rojo', true),
(4, 'Reservado', 'Herramienta reservada para un proyecto', false, 'azul', true),
(5, 'Dañado', 'Herramienta dañada, no disponible', false, 'rojo', true);

INSERT INTO public.puestos (id, nombre_puesto, descripcion, nivel_jerarquico, es_supervisor) VALUES
(1, 'Jefe de Taller', 'Responsable general del taller', 1, true),
(2, 'Supervisor Soldadura', 'Supervisa operaciones de soldadura', 2, true),
(3, 'Soldador Certificado', 'Personal calificado para soldar', 3, false),
(4, 'Ayudante Soldadura', 'Asiste en operaciones de soldadura', 4, false),
(5, 'Almacenista', 'Responsable de materiales y herramientas', 3, false);

INSERT INTO public.estado_usuario (id, nombre, descripcion, permite_acceso, color_indicador, es_editable) VALUES
(1, 'Activo', 'Usuario activo y con acceso al sistema', true, 'green', true),
(2, 'Inactivo', 'Usuario inactivo temporalmente', false, 'gray', true),
(3, 'Vacaciones', 'Usuario en período de vacaciones', false, 'blue', true),
(4, 'Suspendido', 'Usuario suspendido temporalmente', false, 'yellow', true),
(5, 'Eliminado', 'Usuario dado de baja del sistema', false, 'red', false);

INSERT INTO public.turnos (id, nombre, hora_inicio, hora_fin, dias_semana) VALUES
(1, 'Matutino', '08:00:00', '16:00:00', 'Lunes,Martes,Miércoles,Jueves,Viernes'),
(2, 'Vespertino', '16:00:00', '00:00:00', 'Lunes,Martes,Miércoles,Jueves,Viernes'),
(3, 'Nocturno', '00:00:00', '08:00:00', 'Lunes,Martes,Miércoles,Jueves,Viernes'),
(4, 'Fin de Semana', '08:00:00', '14:00:00', 'Sábado,Domingo'),
(5, 'Flexible', '10:00:00', '18:00:00', 'Lunes,Martes,Miércoles,Jueves,Viernes');

INSERT INTO public.tipo_materias_prima (id, nombre, descripcion) VALUES
(1, 'Acero al Carbono', 'Acero común para estructuras y soldadura'),
(2, 'Acero Inoxidable', 'Acero resistente a la corrosión'),
(3, 'Aluminio', 'Metal ligero para aplicaciones especiales'),
(4, 'Electrodos', 'Varillas para soldadura por arco'),
(5, 'Gases', 'Gases para soldadura y corte');

INSERT INTO public.unidades_medida (id, nombre, abreviatura, tipo) VALUES
(1, 'Metro', 'm', 'longitud'),
(2, 'Kilogramo', 'kg', 'peso'),
(3, 'Litro', 'L', 'volumen'),
(4, 'Unidad', 'u', 'cantidad'),
(5, 'Pulgada', 'in', 'longitud');

INSERT INTO public.tipos_stock (id, nombre, descripcion, es_exclusivo) VALUES
(1, 'Stock General', 'Materiales para uso general', false),
(2, 'Stock Proyectos Externos', 'Materiales reservados para clientes externos', true),
(3, 'Stock Prácticas', 'Materiales para prácticas de estudiantes', true),
(4, 'Stock Obsoleto', 'Materiales en desuso o para reciclaje', false);

INSERT INTO public.tipo_pedidos (id, nombre, descripcion, requiere_aprobacion) VALUES
(1, 'Proyecto Interno', 'Trabajos para mantenimiento interno', false),
(2, 'Proyecto Externo', 'Trabajos para clientes externos', true),
(3, 'Prácticas Estudiantes', 'Material para prácticas académicas', true),
(4, 'Reparación Urgente', 'Pedido para reparaciones inmediatas', false),
(5, 'Pruebas Calidad', 'Material para pruebas de control de calidad', true);

INSERT INTO public.estados_pedido (id, nombre, descripcion, color_indicador, permite_edicion, orden_flujo) VALUES
(1, 'Solicitado', 'Pedido creado pero no aprobado', '#FFA500', true, 1),
(2, 'Aprobado', 'Pedido aprobado para ejecución', '#008000', false, 2),
(3, 'En Proceso', 'Pedido en proceso de fabricación', '#0000FF', false, 3),
(4, 'Pausado', 'Pedido detenido temporalmente', '#FFFF00', true, 4),
(5, 'Completado', 'Pedido finalizado y entregado', '#808080', false, 5);

INSERT INTO public.estado_entrega (id, nombre, descripcion) VALUES
(1, 'Parcial', 'Entrega parcial del material solicitado'),
(2, 'Completa', 'Entrega completa del material solicitado'),
(3, 'Verificada', 'Entrega verificada y aceptada'),
(4, 'Rechazada', 'Entrega rechazada por calidad'),
(5, 'Pendiente', 'Entrega pendiente de recepción');

INSERT INTO public.tipo_mantenimientos (id, nombre, descripcion, frecuencia_recomendada_dias, requiere_aprobacion, nivel_tecnico_requerido) VALUES
(1, 'Preventivo', 'Mantenimiento programado', 180, false, 'Medio'),
(2, 'Correctivo', 'Reparación de fallas', 0, true, 'Alto'),
(3, 'Calibración', 'Ajuste de parámetros', 90, false, 'Alto'),
(4, 'Limpieza', 'Limpieza general', 30, false, 'Bajo'),
(5, 'Revisión Seguridad', 'Verificación componentes de seguridad', 60, false, 'Medio');

INSERT INTO public.estado_mantenimiento (id, nombre_estado) VALUES
(1, 'Pendiente'),
(2, 'En Proceso'),
(3, 'Completado'),
(4, 'Cancelado'),
(5, 'Reprogramado');

INSERT INTO public.prioridad_mantenimiento (id, nombre_prioridad) VALUES
(1, 'Crítica'),
(2, 'Alta'),
(3, 'Media'),
(4, 'Baja'),
(5, 'Programada');

INSERT INTO public.departamentos_universidad (id, nombre) VALUES
(1, 'Ingeniería Mecánica'),
(2, 'Ingeniería Industrial'),
(3, 'Tecnología en Soldadura'),
(4, 'Mantenimiento de Instalaciones'),
(5, 'Investigación y Desarrollo');

INSERT INTO public.estado_reparacion (id, nombre_estado) VALUES
(1, 'Reportada'),
(2, 'En Diagnóstico'),
(3, 'En Reparación'),
(4, 'Esperando Repuestos'),
(5, 'Completada');

INSERT INTO public.estado_transaccion (id, nombre_estado) VALUES
(1, 'Pendiente'),
(2, 'Aprobada'),
(3, 'Rechazada'),
(4, 'Procesada'),
(5, 'Cancelada');

INSERT INTO public.estados_devolucion (id, nombre_estado) VALUES
(1, 'Completa'),
(2, 'Parcial'),
(3, 'Con Daños'),
(4, 'Tardía'),
(5, 'Pendiente');

INSERT INTO public.razones_pausa_pedido (id, nombre, descripcion) VALUES
(1, 'Falta de Material', 'Pausado por falta de materiales necesarios'),
(2, 'Esperando Aprobación', 'Pausado pendiente de aprobación adicional'),
(3, 'Problema Técnico', 'Pausado por problemas técnicos con equipos'),
(4, 'Cambio de Diseño', 'Pausado por modificaciones en el diseño'),
(5, 'Priorización', 'Pausado para dar prioridad a otro pedido');

INSERT INTO public.roles (id, descripcion, permiso_subida) VALUES
(1, 'Administrador', 1),
(2, 'Jefe de Taller', 1),
(3, 'Supervisor', 1),
(4, 'Técnico', 0),
(5, 'Almacenista', 0);

INSERT INTO public.tipos_telefono (id, nombre, descripcion) VALUES
(1, 'Móvil', 'Teléfono celular personal'),
(2, 'Oficina', 'Teléfono de la empresa'),
(3, 'Casa', 'Teléfono residencial'),
(4, 'Emergencia', 'Contacto de emergencia'),
(5, 'WhatsApp', 'Número para mensajería instantánea');

INSERT INTO public.tipos_alertas (id, nombre_alertas) VALUES
(1, 'Mantenimiento Requerido'),
(2, 'Daño Detectado'),
(3, 'Calibración Necesaria'),
(4, 'Revisión de Seguridad'),
(5, 'Repuesto Agotado');

INSERT INTO public.tipos_transaccion (id, nombre, descripcion, afecta_ingresos, afecta_gastos, es_interno) VALUES
(1, 'Compra Materiales', 'Adquisición de materias primas', false, true, false),
(2, 'Venta Servicios', 'Ingresos por trabajos realizados', true, false, false),
(3, 'Mantenimiento', 'Gastos en reparaciones', false, true, true),
(4, 'Depreciación', 'Ajuste por depreciación de equipos', false, true, true),
(5, 'Subvención', 'Fondos recibidos para investigación', true, false, true);

INSERT INTO public.metodo_pago (id, nombre, descripcion, requiere_referencia) VALUES
(1, 'Transferencia', 'Transferencia bancaria', true),
(2, 'Efectivo', 'Pago en efectivo', false),
(3, 'Tarjeta Crédito', 'Pago con tarjeta de crédito', true),
(4, 'Cheque', 'Pago con cheque', true),
(5, 'Crédito 30 días', 'Pago a 30 días', true);

INSERT INTO public.usuarios(
    id, nombre, apellido, email, password, puesto_id, estado_id, foto_ruta, 
    es_subcontratado, fecha_contratacion, fecha_termino_contrato, habilidades_tecnicas, 
    turno_id, capacidad_horas_semana, ultimo_acceso, timestamps, zona_trabajo_id)
VALUES 
(1, 'Roberto', 'Sánchez', 'roberto.sanchez@taller.edu', '$2b$10$example.hash.password1', 3, 1, '/img/usuarios/roberto_sanchez.jpg', false, '2023-01-10', NULL, '["soldadura_mig", "medicion_precision"]', 1, 40, NOW(), NOW(), NULL),
(2, 'Laura', 'Fernández', 'laura.fernandez@taller.edu', '$2b$10$example.hash.password2', 4, 1, '/img/usuarios/laura_fernandez.jpg', true, '2023-03-15', '2023-12-31', '["ayudante_soldadura", "seguridad"]', 2, 35, NOW(), NOW(), NULL),
(3, 'Pedro', 'Ramírez', 'pedro.ramirez@taller.edu', '$2b$10$example.hash.password3', 3, 1, '/img/usuarios/pedro_ramirez.jpg', false, '2022-11-20', NULL, '["soldadura_tig", "interpretacion_planos"]', 3, 45, NOW(), NOW(), NULL),
(4, 'Sofía', 'Díaz', 'sofia.diaz@taller.edu', '$2b$10$example.hash.password4', 5, 1, '/img/usuarios/sofia_diaz.jpg', false, '2021-09-05', NULL, '["inventario", "gestion_materiales"]', 1, 40, NOW(), NOW(), NULL),
(5, 'Jorge', 'López', 'jorge.lopez@taller.edu', '$2b$10$example.hash.password5', 2, 1, '/img/usuarios/jorge_lopez.jpg', false, '2020-07-12', NULL, '["supervision", "calidad_soldadura"]', 2, 42, NOW(), NOW(), NULL);

INSERT INTO public.zonas_trabajo (id, nombre, descripcion, ubicacion, responsable_id) VALUES
(1, 'Área de Soldadura', 'Zona para trabajos de soldadura', 'Nave principal, lado este', 2),
(2, 'Área de Corte', 'Zona para corte de materiales', 'Nave principal, lado oeste', 2),
(3, 'Taller Mecánico', 'Área para trabajos mecánicos', 'Edificio anexo, planta baja', 1),
(4, 'Laboratorio de Pruebas', 'Área para pruebas de calidad', 'Edificio anexo, primer piso', 5),
(5, 'Almacén de Herramientas', 'Área de almacenamiento de equipos', 'Nave principal, lado norte', 5);

UPDATE public.usuarios SET zona_trabajo_id = 1 WHERE id IN (1, 3); -- Soldadores
UPDATE public.usuarios SET zona_trabajo_id = 2 WHERE id = 2; -- Ayudante en área de corte  
UPDATE public.usuarios SET zona_trabajo_id = 5 WHERE id = 4; -- Almacenista
UPDATE public.usuarios SET zona_trabajo_id = 1 WHERE id = 5; -- Supervisor

INSERT INTO public.planos (id, nombre, descripcion, version, notas, tipo_pedidos_id, creado_por, estado, archivo_ruta, "timestamp") VALUES
(1, 'Estructura soporte 101', 'Soporte para equipo pesado', '1.2', 'Revisión de seguridad pendiente', 1, 3, 'aprobado', '/planos/estructura_soporte_101_v1.2.dwg', NOW()),
(2, 'Bancada de trabajo', 'Bancada ajustable para soldadura', '2.0', 'Versión final', 2, 3, 'aprobado', '/planos/bancada_trabajo_v2.0.dwg', NOW()),
(3, 'Sistema de almacenamiento', 'Estanterías para taller', '1.0', 'Prototipo inicial', 3, 4, 'borrador', '/planos/sistema_almacenamiento_v1.0.dwg', NOW()),
(4, 'Mesa de corte', 'Mesa especializada para corte plasma', '1.5', 'Modificaciones en curso', 4, 3, 'borrador', '/planos/mesa_corte_v1.5.dwg', NOW()),
(5, 'Carro portaherramientas', 'Carro móvil para equipos', '3.1', 'Versión estable', 5, 4, 'aprobado', '/planos/carro_portaherramientas_v3.1.dwg', NOW());

INSERT INTO public.herramientas (id, nombre, tipo_herramienta_id, modelo, fabricante, numero_serie, codigo_inventario, estado_herramienta_id, vida_util_horas, horas_uso_actual, zonas_trabajo_id, fecha_adquisicion, costo_adquisicion, valor_actual, especificaciones_tecnicas, imagen_ruta, fecha_ultimo_mantenimiento, fecha_proximo_mantenimiento, notas, timestamps) VALUES
(1, 'Soldadora MIG-200', 1, 'PowerMIG 200', 'Lincoln Electric', 'SN-MIG200-001', 'INV-SLD-001', 1, 5000, 1250, 1, '2022-01-15', 25000.00, 18000.00, '{"amperaje_max": "200A", "ciclo_trabajo": "60%"}', '/img/herramientas/soldadora_mig200.jpg', '2023-06-01', '2023-12-01', 'Requiere revisión de cables', NOW()),
(2, 'Soldadora TIG-ACDC', 2, 'Precision TIG 225', 'Lincoln Electric', 'SN-TIG225-001', 'INV-SLD-002', 1, 6000, 800, 1, '2022-03-10', 32000.00, 28000.00, '{"rango_amperaje": "5-225A", "frecuencia": "20-400Hz"}', '/img/herramientas/soldadora_tig225.jpg', '2023-05-15', '2023-11-15', 'En excelente estado', NOW()),
(3, 'Esmeril angular 7"', 3, 'GA7020', 'Makita', 'SN-ESM7020-001', 'INV-ESM-001', 1, 1000, 300, 2, '2023-02-20', 4500.00, 4000.00, '{"velocidad": "6600rpm", "potencia": "1800W"}', '/img/herramientas/esmeril_makita.jpg', '2023-07-10', '2024-01-10', 'Disco nuevo instalado', NOW()),
(4, 'Cortadora plasma 40A', 4, 'Powermax45 XP', 'Hypertherm', 'SN-PLASMA45-001', 'INV-CRT-001', 1, 4000, 500, 2, '2021-11-05', 42000.00, 35000.00, '{"espesor_corte": "16mm", "consumo_aire": "5.6m3/h"}', '/img/herramientas/cortadora_plasma.jpg', '2023-04-20', '2023-10-20', 'Recién calibrada', NOW()),
(5, 'Soplete oxicorte', 5, 'Victor Performer', 'Victor Technologies', 'SN-SOPVIC-001', 'INV-SOP-001', 1, 3000, 1200, 2, '2020-08-12', 8500.00, 6000.00, '{"presion_oxigeno": "8bar", "presion_gas": "0.5bar"}', '/img/herramientas/soplete_victor.jpg', '2023-03-05', '2023-09-05', 'Requiere cambio de boquillas', NOW());

INSERT INTO public.materias_prima (id, codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps) VALUES
(1, 'AC-1010', 'Plancha Acero 1010', 'Plancha de acero al carbono 1/4"', 1, 1, 10, 100, 50, 2.5, 52.5, 1, true, 1, 25.50, 'Aceros Nacionales', 7, true, NOW()),
(2, 'AI-304', 'Tubo Inox 304', 'Tubo de acero inoxidable 304 2"', 2, 1, 20, 200, 100, 0, 100, 1, false, 2, 45.75, 'Inoxidables S.A.', 14, true, NOW()),
(3, 'AL-6061', 'Barra Aluminio 6061', 'Barra de aluminio 6061 1/2"', 3, 1, 15, 150, 75, 1.2, 76.2, 1, true, 1, 32.40, 'Aluminios del Norte', 10, false, NOW()),
(4, 'EL-7018', 'Electrodo 7018', 'Electrodos para soldadura 7018 1/8"', 4, 2, 5, 50, 25, 0, 25, 2, false, 1, 12.80, 'Soldaduras Industriales', 5, true, NOW()),
(5, 'GS-ARGON', 'Gas Argón', 'Cilindro de gas argón para TIG', 5, 3, 3, 30, 10, 0.5, 10.5, 3, true, 1, 120.00, 'Gases Técnicos', 3, true, NOW());

INSERT INTO public.pedidos (
    id, codigo_pedido, tipo_pedido_id, plano_id, solicitante_id, aprobador_id, 
    supervisor_id, fecha_solicitud, fecha_aprobacion, fecha_requerida, 
    fecha_estimada_entrega, fecha_completado, estado_id, pausado_desde, 
    pausado_hasta, razon_pausa_actual_id, contador_pausas, tiempo_total_pausado, 
    prioridad, proyecto_asociado, costo_estimado, costo_real, precio_final, 
    notas, "createdAt", "updatedAt"
) VALUES 
(1, 'PED-2025-001', 1, 1, 1, 1, 1, '2025-06-15 09:30:00', '2025-06-16 14:20:00', '2025-06-25', '2025-06-24', '2025-06-23 16:45:00', 5, NULL, NULL, NULL, 0, 0, 2, 'PROJ-A001', 450.75, 425.50, 480.00, 'Proyecto completado exitosamente', '2025-06-15 09:30:00', '2025-06-23 16:45:00'),
(2, 'PED-2025-002', 2, 2, 2, 2, 2, '2025-06-18 11:15:00', NULL, '2025-07-05', '2025-07-02', NULL, 1, NULL, NULL, NULL, 0, 0, 1, 'PROJ-B002', 1250.00, NULL, 1375.00, 'Pendiente de aprobación', '2025-06-18 11:15:00', '2025-06-18 11:15:00'),
(3, 'PED-2025-003', 3, 3, 3, 3, 3, '2025-06-10 08:45:00', '2025-06-12 10:30:00', '2025-06-30', '2025-06-28', NULL, 4, '2025-06-19 00:00:00', '2025-06-25 00:00:00', 1, 1, 144, 3, 'PROJ-C003', 850.25, NULL, 935.28, 'Pausado por falta de materiales', '2025-06-10 08:45:00', '2025-06-19 00:00:00'),
(4, 'PED-2025-004', 4, 4, 4, 4, 4, '2025-06-20 14:20:00', '2025-06-21 09:15:00', '2025-07-10', '2025-07-08', NULL, 2, NULL, NULL, NULL, 0, 0, 2, 'PROJ-D004', 2100.00, 1950.75, 2310.00, 'Aprobado y en espera de inicio', '2025-06-20 14:20:00', '2025-06-21 09:15:00'),
(5, 'PED-2025-005', 5, 5, 5, 5, 5, '2025-06-05 16:00:00', '2025-06-06 08:30:00', '2025-06-15', '2025-06-12', '2025-06-14 13:20:00', 5, NULL, NULL, NULL, 2, 72, 1, 'PROJ-E005', 320.50, 298.75, 340.00, 'Completado con retrasos menores', '2025-06-05 16:00:00', '2025-06-14 13:20:00');

INSERT INTO public.pedido_materiales (
    id, pedido_id, material_id, cantidad_solicitada, cantidad_aprobada, 
    cantidad_entregada, cantidad_devuelta, unidad_medida_id, estado_entrega_id, 
    tipo_stock_destino, costo_unitario, desperdicio_estimado, desperdicio_real, notas
) VALUES 
(1, 1, 1, 10.0, 10.0, 10.0, 0.0, 1, 3, 1, 25.50, 5.0, 3.2, 'Material entregado completo'),
(2, 1, 4, 50.0, 50.0, 50.0, 0.0, 2, 3, 1, 12.80, 10.0, 8.5, 'Electrodos utilizados completamente'),
(3, 2, 2, 5.0, 5.0, 0.0, 0.0, 1, 5, 2, 45.75, 2.0, NULL, 'Pendiente de entrega'),
(4, 3, 3, 20.0, 15.0, 0.0, 0.0, 1, 5, 3, 32.40, 8.0, NULL, 'Reducido por disponibilidad'),
(5, 4, 5, 2.0, 2.0, 1.0, 0.0, 3, 1, 1, 120.00, 0.0, NULL, 'Entrega parcial');

INSERT INTO public.usuarios_roles (id, usuario_id, role_id) VALUES
(1, 1, 4), -- Roberto - Técnico
(2, 2, 4), -- Laura - Técnico  
(3, 3, 4), -- Pedro - Técnico
(4, 4, 5), -- Sofía - Almacenista
(5, 5, 3) ; -- Jorge - Supervisor

INSERT INTO public.permisos (id, role_id, descripcion) VALUES
(1, 1, 'Acceso total al sistema'),
(2, 2, 'Gestionar pedidos y herramientas'),
(3, 3, 'Supervisar operaciones'),
(4, 4, 'Usar herramientas y reportar mantenimiento'),
(5, 5, 'Gestionar inventario');

INSERT INTO public.telefonos_usuario (id_telefono, usuario_id, tipo_telefono_id, numero, es_principal) VALUES
(1, 1, 1, '5551234567', true),
(2, 1, 2, '5559876543', false),
(3, 2, 1, '5557654321', true),
(4, 3, 1, '5556789012', true),
(5, 4, 1, '5554567890', true),
(6, 5, 1, '5552345678', true),
(7, 5, 2, '5558765432', false)
ON CONFLICT (id_telefono) DO NOTHING;

INSERT INTO public.alertas_reparacion (id, herramienta_id, tipo_alerta_id, fecha_generacion, fecha_limite, prioridad_id, estado_reparacion, descripcion, resuelta_por, fecha_resolucion) VALUES
(1, 2, 2, '2023-10-17 09:15:00', '2023-10-19', 3, 1, 'Fallo en el sistema eléctrico', NULL, NULL),
(2, 4, 1, '2023-10-18 11:20:00', '2023-10-22', 2, 5, 'Pérdida de presión en el sistema', 4, '2023-10-19 16:45:00'),
(3, 5, 4, '2023-10-19 14:00:00', '2023-10-25', 4, 1, 'Requiere lubricación general', NULL, NULL),
(4, 1, 3, '2023-10-20 10:30:00', '2023-10-23', 2, 5, 'Calibración de sensores necesaria', 2, '2023-10-21 09:15:00'),
(5, 3, 2, '2023-10-21 08:45:00', '2023-10-24', 3, 1, 'Reemplazo de piezas desgastadas', NULL, NULL);

INSERT INTO public.entregas_pedidos (
    id, pedido_id, entrega_numero, entregado_por, recibido_por, 
    fecha_entrega, ubicacion_entrega, estado_entrega_id, metodo_transporte, 
    documento_entrega, notas
) VALUES 
(1, 1, 1, 1, 2, '2025-06-20 10:00:00', 'Taller principal', 2, 'Camión', 'ENT-001.pdf', 'Entrega completa'),
(2, 2, 1, 2, 3, '2025-06-22 14:30:00', 'Almacén B', 1, 'Furgoneta', 'ENT-002.pdf', 'Entrega parcial'),
(3, 3, 1, 3, 4, '2025-06-25 09:15:00', 'Zona de soldadura', 3, 'Montacargas', 'ENT-003.pdf', 'Material verificado'),
(4, 4, 1, 4, 5, '2025-06-28 11:45:00', 'Taller secundario', 1, 'Carretilla', 'ENT-004.pdf', 'Entrega parcial'),
(5, 5, 1, 5, 1, '2025-07-01 16:20:00', 'Almacén central', 2, 'Camión', 'ENT-005.pdf', 'Entrega completa');

INSERT INTO public.pedido_herramientas (
    id, pedido_id, herramienta_id, cantidad_solicitada, cantidad_aprobada, 
    cantidad_asignada, fecha_estimada_devolucion, fecha_real_devolucion, 
    estado_herramienta_id, notas
) VALUES 
(1, 1, 1, 2, 2, 2, '2025-07-10', '2025-07-08', 1, 'Soldadoras MIG utilizadas correctamente'),
(2, 1, 4, 1, 1, 1, '2025-07-10', '2025-07-08', 1, 'Cortadora plasma para acabados'),
(3, 2, 2, 1, 1, 1, '2025-07-15', NULL, 2, 'Soldadora TIG en uso'),
(4, 3, 3, 2, 2, 2, '2025-07-20', NULL, 3, 'Esmeriles en mantenimiento'),
(5, 4, 5, 1, 1, 0, '2025-07-25', NULL, 4, 'Soplete reservado'),
(6, 5, 1, 1, 1, 1, '2025-06-20', '2025-06-14', 1, 'Soldadora devuelta a tiempo');

INSERT INTO public.plano_herramientas (
    id, plano_id, herramienta_id, cantidad_necesaria, tiempo_estimado_uso, notas
) VALUES 
(1, 1, 1, 2, 8.5, 'Soldadoras MIG para estructura principal'),
(2, 1, 4, 1, 3.0, 'Cortadora plasma para cortes precisos'),
(3, 2, 2, 1, 6.0, 'Soldadora TIG para acabados de calidad'),
(4, 2, 3, 1, 2.0, 'Esmeril para preparación de superficies'),
(5, 3, 3, 2, 4.0, 'Esmeriles para múltiples cortes'),
(6, 4, 4, 1, 5.0, 'Cortadora plasma para mesa de corte'),
(7, 5, 1, 1, 3.0, 'Soldadora MIG para ensamblaje del carro'),
(8, 5, 5, 1, 1.5, 'Soplete para trabajos menores');

INSERT INTO public.plano_materiales (
    id, plano_id, material_id, cantidad, cantidad_extra, unidad_medida_id, 
    notas, desperdicio_estimado, pedido_id
) VALUES 
(1, 1, 1, 8.0, 1.0, 1, 'Planchas para estructura de soporte', 5.0, 1),
(2, 1, 4, 2.0, 0.2, 2, 'Electrodos 7018 para soldadura', 10.0, 1),
(3, 2, 2, 3.0, 0.5, 1, 'Tubos inoxidables para bancada', 3.0, 2),
(4, 3, 3, 15.0, 2.0, 1, 'Barras de aluminio para estanterías', 8.0, 3),
(5, 4, 1, 5.0, 0.8, 1, 'Planchas para mesa de corte', 6.0, 4),
(6, 4, 4, 1.5, 0.3, 2, 'Electrodos para ensamblaje', 15.0, 4),
(7, 5, 2, 2.0, 0.3, 1, 'Tubos para estructura del carro', 4.0, 5),
(8, 5, 5, 0.5, 0.1, 3, 'Gas argón para soldadura TIG', 2.0, 5);

INSERT INTO public.transacciones_financieras (
    id, codigo, tipo_transaccion_id, departamento_id, fecha_transaccion, 
    fecha_creacion, monto_total, descripcion, estado_transaccion_id, 
    aprobado_por, fecha_aprobacion, metodo_pago_id, referencia_pago, 
    creado_por, notas
) VALUES 
(1, 'TRX-2025-001', 1, 3, '2025-06-10 10:00:00', '2025-06-09 15:30:00', 1275.00, 'Compra materiales para proyectos Q2', 2, 5, '2025-06-10 08:00:00', 1, 'TRF-20250610-001', 4, 'Materiales para soldadura'),
(2, 'TRX-2025-002', 2, 3, '2025-06-23 16:45:00', '2025-06-23 16:50:00', 480.00, 'Ingreso por proyecto PED-2025-001', 2, 5, '2025-06-23 17:00:00', 1, 'ING-20250623-001', 1, 'Pago recibido por proyecto completado'),
(3, 'TRX-2025-003', 3, 4, '2025-06-15 11:20:00', '2025-06-14 16:00:00', 850.75, 'Mantenimiento preventivo herramientas', 2, 2, '2025-06-15 09:00:00', 2, 'ING-20250623-001', 5, 'Mantenimiento trimestral'),
(4, 'TRX-2025-004', 1, 3, '2025-07-01 14:30:00', '2025-06-30 10:15:00', 2850.00, 'Compra equipos nuevos taller', 1, 2, '2025-06-14 14:00:00', 4, 'CHQ-2025-078', 2, 'Pendiente de aprobación'),
(5, 'TRX-2025-005', 2, 3, '2025-06-14 13:20:00', '2025-06-14 13:25:00', 340.00, 'Ingreso por proyecto PED-2025-005', 2, 5, '2025-06-14 14:00:00', 2, 'ING-20250623-001', 1, 'Proyecto urgente completado');

INSERT INTO public.detalle_transaccion (
    id, transaccion_id, cantidad, precio_unitario, subtotal, 
    iva, total, concepto
) VALUES 
(1, 1, 50.0, 25.50, 1275.00, 204.00, 1479.00, 'Planchas acero al carbono 1010'),
(2, 2, 1.0, 480.00, 480.00, 76.80, 556.80, 'Servicio fabricación estructura soporte'),
(3, 3, 1.0, 850.75, 850.75, 136.12, 986.87, 'Mantenimiento preventivo equipos'),
(4, 4, 2.0, 1425.00, 2850.00, 456.00, 3306.00, 'Soldadoras industriales nuevas'),
(5, 5, 1.0, 340.00, 340.00, 54.40, 394.40, 'Servicio reparación urgente');

INSERT INTO public.historial_pedidos (
    id, pedido_id, usuario_id, accion, estado_anterior_id, estado_nuevo_id, 
    razon_pausa_id, comentario_pausa, descripcion, fecha_accion, 
    fecha_resolucion_estimada, cambios
) VALUES 
(1, 1, 1, 'Creación', NULL, 1, NULL, NULL, 'Pedido creado por Roberto Sánchez', '2025-06-15 09:30:00', NULL, '{"estado": "Creado", "solicitante": "Roberto Sánchez"}'),
(2, 1, 1, 'Aprobación', 1, 2, NULL, NULL, 'Pedido aprobado automáticamente', '2025-06-16 14:20:00', NULL, '{"estado": "Aprobado"}'),
(3, 1, 5, 'En Proceso', 2, 3, NULL, NULL, 'Pedido iniciado por supervisor', '2025-06-17 08:00:00', '2025-06-24', '{"estado": "En Proceso", "supervisor": "Jorge López"}'),
(4, 1, 1, 'Completado', 3, 5, NULL, NULL, 'Pedido completado exitosamente', '2025-06-23 16:45:00', NULL, '{"estado": "Completado", "entregado": true}'),
(5, 2, 2, 'Creación', NULL, 1, NULL, NULL, 'Pedido creado por Laura Fernández', '2025-06-18 11:15:00', NULL, '{"estado": "Creado", "solicitante": "Laura Fernández"}'),
(6, 3, 3, 'Creación', NULL, 1, NULL, NULL, 'Pedido creado por Pedro Ramírez', '2025-06-10 08:45:00', NULL, '{"estado": "Creado", "solicitante": "Pedro Ramírez"}'),
(7, 3, 3, 'Aprobación', 1, 2, NULL, NULL, 'Pedido aprobado para prácticas', '2025-06-12 10:30:00', NULL, '{"estado": "Aprobado"}'),
(8, 3, 3, 'Pausa', 2, 4, 1, 'Falta de material específico', 'Pausado por falta de materiales', '2025-06-19 00:00:00', '2025-06-25', '{"estado": "Pausado", "razon": "Falta de Material"}'),
(9, 4, 4, 'Creación', NULL, 1, NULL, NULL, 'Pedido urgente creado por Sofía Díaz', '2025-06-20 14:20:00', NULL, '{"estado": "Creado", "urgente": true}'),
(10, 4, 4, 'Aprobación', 1, 2, NULL, NULL, 'Pedido urgente aprobado', '2025-06-21 09:15:00', NULL, '{"estado": "Aprobado"}'),
(11, 5, 5, 'Creación', NULL, 1, NULL, NULL, 'Pedido creado por Jorge López', '2025-06-05 16:00:00', NULL, '{"estado": "Creado", "solicitante": "Jorge López"}'),
(12, 5, 5, 'Aprobación', 1, 2, NULL, NULL, 'Pedido aprobado para pruebas', '2025-06-06 08:30:00', NULL, '{"estado": "Aprobado"}'),
(13, 5, 5, 'En Proceso', 2, 3, NULL, NULL, 'Pedido iniciado', '2025-06-07 09:00:00', '2025-06-12', '{"estado": "En Proceso"}'),
(14, 5, 5, 'Completado', 3, 5, NULL, NULL, 'Pedido completado con retrasos menores', '2025-06-14 13:20:00', NULL, '{"estado": "Completado", "retraso": "2 días"}');

INSERT INTO public.mantenimientos (
    id, nombre, herramienta_id, tipo_mantenimiento_id, fecha_programada, 
    fecha_inicio, fecha_fin, estado_id, prioridad_id, costo_estimado, 
    costo_real, tecnico_asignado_id, descripcion_problema, acciones_realizadas, 
    repuestos_utilizados, horas_trabajo, fecha_creacion, mantenimiento_hecho_por, 
    actualizado_por, fecha_actualizacion
) VALUES 
(1, 'Mantenimiento preventivo MIG-200', 1, 1, '2025-06-01', '2025-06-01 08:00:00', '2025-06-01 12:30:00', 3, 5, 250.00, 225.50, 3, 'Mantenimiento rutinario trimestral', 'Limpieza completa, lubricación, revisión eléctrica', '["Aceite lubricante", "Filtros de aire", "Cables de conexión"]', 4.5, '2025-05-25 10:00:00', 3, 5, '2025-06-01 13:00:00'),
(2, 'Reparación sistema TIG', 2, 2, '2025-06-15', '2025-06-15 09:15:00', '2025-06-16 16:00:00', 3, 2, 680.00, 750.30, 1, 'Falla en sistema de control de frecuencia', 'Reemplazo de tarjeta controladora y calibración', '["Tarjeta control", "Conectores", "Fusibles"]', 8.5, '2025-06-10 14:30:00', 1, 5, '2025-06-16 17:00:00'),
(3, 'Calibración esmeril angular', 3, 3, '2025-07-10', '2025-07-10 10:30:00', '2025-07-10 14:45:00', 3, 3, 150.00, 140.00, 4, 'Calibración anual de velocidad', 'Ajuste de velocidad y balanceado del disco', '["Disco de balanceado"]', 4.25, '2025-07-05 11:15:00', 4, 5, '2025-07-10 15:30:00'),
(4, 'Cambio consumibles plasma', 4, 4, '2025-06-20', '2025-06-20 13:00:00', '2025-06-20 16:30:00', 3, 4, 420.00, 380.75, 2, 'Desgaste normal de boquillas y electrodos', 'Reemplazo completo de consumibles', '["Boquillas", "Electrodos plasma", "Protectores"]', 3.5, '2025-06-18 16:45:00', 2, 5, '2025-06-20 17:00:00'),
(5, 'Revisión soplete oxicorte', 5, 5, '2025-07-05', '2025-07-05 15:00:00', '2025-07-05 17:15:00', 3, 4, 180.00, 165.00, 3, 'Revisión de seguridad semestral', 'Inspección válvulas, mangueras y boquillas', '["Boquillas de corte", "O-rings"]', 2.25, '2025-07-01 09:30:00', 3, 5, '2025-07-05 18:00:00'),
(6, 'Mantenimiento preventivo MIG-200 (próximo)', 1, 1, '2025-12-01', NULL, NULL, 1, 5, 280.00, NULL, 3, 'Mantenimiento preventivo programado', NULL, NULL, NULL, '2025-11-15 10:00:00', 1, NULL, NULL),
(7, 'Calibración TIG (próxima)', 2, 3, '2025-11-15', NULL, NULL, 1, 3, 200.00, NULL, 1, 'Calibración semestral programada', NULL, NULL, NULL, '2025-11-01 10:00:00', 1, NULL, NULL);

INSERT INTO public.detalle_entregas (
    id, entrega_id, material_id, pedido_material_id, cantidad_entregada, 
    unidad_medida_id, lote, calidad, ubicacion_destino, notas
) VALUES 
(1, 1, 1, 1, 10.0, 1, 'LOTE-AC1010-2025-06', 'A', 'Zona Soldadura A1', 'Planchas en excelente estado'),
(2, 1, 4, 2, 50.0, 2, 'LOTE-EL7018-2025-06', 'A', 'Almacén Electrodos', 'Electrodos certificados AWS'),
(3, 2, 2, 3, 0.0, 1, 'LOTE-AC1010-2025-06', 'LOTE-AC1010-2025-06', 'A', 'Pendiente de disponibilidad en almacén'),
(4, 3, 3, 4, 15.0, 1, 'LOTE-AL6061-2025-06', 'B', 'Taller Prácticas', 'Material para estudiantes'),
(5, 4, 5, 5, 1.0, 3, 'LOTE-ARGON-2025-07', 'A', 'Área Soldadura TIG', 'Cilindro lleno, presión verificada');

INSERT INTO public.historial_movimientos_stock (
    id, material_id, cantidad, unidad_medida_id, origen_stock_id, 
    destino_stock_id, usuario_id, fecha_movimiento, tipo_movimiento, 
    motivo, documento_referencia, pedido_id
) VALUES 
(1, 1, 100.0, 1, 1, 1, 4, '2025-06-01 09:00:00', 'Entrada', 'Compra inicial de planchas', 'FAC-AC1010-001', NULL),
(2, 4, 200.0, 2, 2, 1, 4, '2025-06-01 09:30:00', 'Entrada', 'Compra electrodos 7018', 'FAC-EL7018-001', NULL),
(3, 2, 50.0, 1, 1, 2, 4, '2025-06-05 14:00:00', 'Entrada', 'Tubos inox para proyectos externos', 'FAC-AI304-001', NULL),
(4, 3, 80.0, 1, 2, 3, 4, '2025-06-08 10:15:00', 'Entrada', 'Barras aluminio para prácticas', 'FAC-AL6061-001', NULL),
(5, 5, 15.0, 3, 1, 1, 4, '2025-06-10 11:30:00', 'Entrada', 'Cilindros argón para TIG', 'FAC-ARGON-001', NULL),
(6, 1, 10.0, 1, 1, 2, 1, '2025-06-15 08:30:00', 'Salida', 'Consumo en pedido PED-2025-001', 'PED-2025-001', 1),
(7, 4, 50.0, 2, 1, 1, 1, '2025-06-15 08:35:00', 'Salida', 'Consumo electrodos pedido PED-2025-001', 'PED-2025-001', 1),
(8, 3, 15.0, 1, 3, 2, 3, '2025-06-19 14:20:00', 'Salida', 'Material para prácticas pausadas', 'PED-2025-003', 3),
(9, 5, 1.0, 3, 1, 2, 5, '2025-06-28 16:00:00', 'Salida', 'Gas para pedido urgente', 'PED-2025-004', 4),
(10, 5, 0.5, 3, 1, 2, 5, '2025-06-14 12:00:00', 'Salida', 'Gas para pedido PED-2025-005', 'PED-2025-005', 5);

INSERT INTO public.historial_uso_herramientas (
    id, herramienta_id, usuario_id, proyecto_id, fecha_uso, 
    fecha_devolucion, horas_utilizada, estado_devolucion_id, notas, aprobado_por
) VALUES 
(1, 1, 1, 1, '2025-06-17 08:00:00', '2025-06-23 16:00:00', 28.5, 1, 'Soldadora MIG utilizada para estructura soporte', 5),
(2, 4, 1, 1, '2025-06-18 10:00:00', '2025-06-23 15:00:00', 6.0, 1, 'Cortadora plasma para cortes precisos', 5),
(3, 2, 2, 2, '2025-06-20 09:00:00', NULL, NULL, 5, 'Soldadora TIG en uso para bancada', 5),
(4, 3, 3, 3, '2025-06-12 08:30:00', '2025-06-19 00:00:00', 15.5, 3, 'Esmeriles devueltos con desgaste, requieren mantenimiento', 5),
(5, 1, 5, 5, '2025-06-07 10:00:00', '2025-06-14 13:00:00', 12.0, 1, 'Soldadora para carro portaherramientas', 2),
(6, 5, 4, 4, '2025-06-21 14:00:00', NULL, NULL, 5, 'Soplete reservado para reparación urgente', 2),
(7, 2, 3, 3, '2025-06-25 09:00:00', NULL, NULL, 5, 'TIG reasignado después de pausa del proyecto', 5);

INSERT INTO public.competencias (id, nombre) VALUES
(1, 'Soldadura MIG/MAG'),
(2, 'Soldadura TIG'),
(3, 'Corte con Plasma'),
(4, 'Oxicorte'),
(5, 'Lectura de Planos Técnicos'),
(6, 'Medición de Precisión'),
(7, 'Control de Calidad'),
(8, 'Seguridad Industrial'),
(9, 'Gestión de Inventarios'),
(10, 'Supervisión de Personal');

INSERT INTO public.usuarios_competencias ("usuarioId", "competenciaId", nivel) VALUES
(1, 1, 4), -- Roberto - Soldadura MIG nivel experto
(1, 6, 3), -- Roberto - Medición de precisión nivel avanzado
(1, 5, 3), -- Roberto - Lectura de planos nivel avanzado
(2, 1, 2), -- Laura - Soldadura MIG nivel intermedio
(2, 8, 3), -- Laura - Seguridad industrial nivel avanzado
(3, 2, 4), -- Pedro - Soldadura TIG nivel experto
(3, 5, 4), -- Pedro - Lectura de planos nivel experto
(3, 7, 3), -- Pedro - Control de calidad nivel avanzado
(4, 9, 4), -- Sofía - Gestión de inventarios nivel experto
(4, 8, 3), -- Sofía - Seguridad industrial nivel avanzado
(5, 10, 4), -- Jorge - Supervisión nivel experto
(5, 7, 4), -- Jorge - Control de calidad nivel experto
(5, 1, 3), -- Jorge - Soldadura MIG nivel avanzado
(5, 2, 3); -- Jorge - Soldadura TIG nivel avanzado

INSERT INTO public.asignaciones_pedidos ("usuarioId", "pedidoId", "horasAsignadas") VALUES
(1, 1, 32), -- Roberto asignado 32 horas al pedido 1
(5, 1, 8),  -- Jorge supervisando 8 horas al pedido 1
(2, 2, 40), -- Laura asignada 40 horas al pedido 2
(5, 2, 10), -- Jorge supervisando 10 horas al pedido 2
(3, 3, 25), -- Pedro asignado 25 horas al pedido 3 (pausado)
(4, 4, 35), -- Sofía asignada 35 horas al pedido 4
(1, 4, 15), -- Roberto asignado 15 horas adicionales al pedido 4
(5, 5, 20), -- Jorge asignado 20 horas al pedido 5 (completado)
(3, 5, 12); -- Pedro asignado 12 horas al pedido 5 (completado)

INSERT INTO public.archivos (id, nombre, ruta, thumbnail, fecha_subida) VALUES
(1, 'Manual_Soldadora_MIG200.pdf', '/documentos/manuales/Manual_Soldadora_MIG200.pdf', '/thumbnails/pdf_icon.png', '2023-01-15 10:30:00'),
(2, 'Certificado_Calibracion_TIG225.pdf', '/documentos/certificados/Certificado_Calibracion_TIG225.pdf', '/thumbnails/cert_icon.png', '2023-05-15 14:20:00'),
(3, 'Foto_Herramienta_Esmeril.jpg', '/imagenes/herramientas/esmeril_makita_001.jpg', '/thumbnails/esmeril_thumb.jpg', '2023-02-20 09:15:00'),
(4, 'Plano_Estructura_Soporte_v1.2.dwg', '/planos/estructura_soporte_101_v1.2.dwg', '/thumbnails/dwg_icon.png', '2025-06-10 16:45:00'),
(5, 'Factura_Compra_Materiales_001.pdf', '/documentos/facturas/FAC-AC1010-001.pdf', '/thumbnails/invoice_icon.png', '2025-06-01 11:00:00');

INSERT INTO public.versiones_documentos ("planoId", numero_version, notas, creado_por, archivo_ruta, "createdAt", "updatedAt") VALUES
(1, 1, 'Versión inicial del diseño', 3, '/planos/estructura_soporte_101_v1.0.dwg', '2025-05-15 10:00:00', '2025-05-15 10:00:00'),
(1, 2, 'Correcciones en medidas de soldadura', 3, '/planos/estructura_soporte_101_v1.2.dwg', '2025-06-10 16:45:00', '2025-06-10 16:45:00'),
(2, 1, 'Diseño inicial de bancada', 3, '/planos/bancada_trabajo_v1.0.dwg', '2025-05-20 14:30:00', '2025-05-20 14:30:00'),
(2, 2, 'Versión final con ajustes ergonómicos', 3, '/planos/bancada_trabajo_v2.0.dwg', '2025-06-05 11:20:00', '2025-06-05 11:20:00'),
(3, 1, 'Prototipo inicial estanterías', 4, '/planos/sistema_almacenamiento_v1.0.dwg', '2025-06-08 13:15:00', '2025-06-08 13:15:00'),
(4, 1, 'Diseño base mesa de corte', 3, '/planos/mesa_corte_v1.0.dwg', '2025-06-12 09:30:00', '2025-06-12 09:30:00'),
(4, 2, 'Modificaciones en estructura', 3, '/planos/mesa_corte_v1.5.dwg', '2025-06-18 15:45:00', '2025-06-18 15:45:00'),
(5, 1, 'Primera versión del carro', 4, '/planos/carro_portaherramientas_v1.0.dwg', '2025-05-25 10:45:00', '2025-05-25 10:45:00'),
(5, 2, 'Mejoras en movilidad', 4, '/planos/carro_portaherramientas_v2.0.dwg', '2025-05-30 16:20:00', '2025-05-30 16:20:00'),
(5, 3, 'Versión estable final', 4, '/planos/carro_portaherramientas_v3.1.dwg', '2025-06-03 12:00:00', '2025-06-03 12:00:00');

INSERT INTO public.herramientas (id, nombre, tipo_herramienta_id, modelo, fabricante, numero_serie, codigo_inventario, estado_herramienta_id, vida_util_horas, horas_uso_actual, zonas_trabajo_id, fecha_adquisicion, costo_adquisicion, valor_actual, especificaciones_tecnicas, imagen_ruta, fecha_ultimo_mantenimiento, fecha_proximo_mantenimiento, notas, timestamps) VALUES
(6, 'Soldadora MIG-180 Backup', 1, 'PowerMIG 180', 'Lincoln Electric', 'SN-MIG180-002', 'INV-SLD-003', 1, 5000, 850, 1, '2023-03-20', 22000.00, 18500.00, '{"amperaje_max": "180A", "ciclo_trabajo": "40%"}', '/img/herramientas/soldadora_mig180_backup.jpg', '2023-08-15', '2024-02-15', 'Equipo de respaldo en buen estado', NOW()),
(7, 'Esmeril Banco 6"', 3, 'GB6010', 'DeWalt', 'SN-BENCH6-001', 'INV-ESM-002', 1, 2000, 400, 3, '2022-07-10', 3200.00, 2800.00, '{"diámetro": "150mm", "potencia": "250W", "rpm": "2850"}', '/img/herramientas/esmeril_banco.jpg', '2023-09-01', '2024-03-01', 'Para trabajos de precisión', NOW()),
(8, 'Cortadora Banda Metales', 4, 'BS-7L', 'Jet', 'SN-BANDA7L-001', 'INV-CRT-002', 2, 3000, 650, 2, '2021-12-15', 18000.00, 14000.00, '{"corte_max": "180mm", "velocidad_banda": "27-55m/min"}', '/img/herramientas/cortadora_banda.jpg', '2023-06-20', '2023-12-20', 'En uso para cortes seriados', NOW());

INSERT INTO public.materias_prima (id, codigo, nombre, descripcion, tipo_materia_prima_id, unidad_base_id, stock_minimo, stock_maximo, unidades_completas, fracciones, stock_total, fraccion_unidad_id, permite_fraccion, pertenece_a_stock_id, costo_unitario, proveedor_principal, tiempo_reposicion, es_controlado, timestamps) VALUES
(6, 'AC-A36', 'Perfil Angular A36', 'Angular de acero estructural 2"x2"x1/4"', 1, 1, 25, 250, 80, 3.5, 83.5, 1, true, 1, 18.75, 'Perfiles Industriales', 10, false, NOW()),
(7, 'EL-6013', 'Electrodo 6013', 'Electrodos para soldadura 6013 3/32"', 4, 2, 10, 100, 40, 0, 40, 2, false, 1, 9.50, 'Soldaduras Industriales', 5, false, NOW()),
(8, 'GS-CO2', 'Gas CO2', 'Cilindro de dióxido de carbono para MIG', 5, 3, 2, 20, 8, 0, 8, 3, false, 1, 85.00, 'Gases Técnicos', 3, true, NOW()),
(9, 'AC-REDONDO', 'Varilla Redonda 1020', 'Varilla redonda acero 1020 de 1/2"', 1, 1, 30, 300, 120, 5.2, 125.2, 1, true, 1, 15.25, 'Aceros Nacionales', 8, false, NOW()),
(10, 'FLUX-MIG', 'Alambre Flux MIG', 'Alambre tubular con flux 0.035"', 4, 2, 8, 80, 25, 0, 25, 2, false, 1, 28.90, 'Soldaduras Industriales', 7, true, NOW());

INSERT INTO public.mantenimientos (
    id, nombre, herramienta_id, tipo_mantenimiento_id, fecha_programada, 
    fecha_inicio, fecha_fin, estado_id, prioridad_id, costo_estimado, 
    costo_real, tecnico_asignado_id, descripcion_problema, acciones_realizadas, 
    repuestos_utilizados, horas_trabajo, fecha_creacion, mantenimiento_hecho_por, 
    actualizado_por, fecha_actualizacion
) VALUES 
(8, 'Limpieza general esmeril banco', 7, 4, '2025-08-01', NULL, NULL, 1, 4, 80.00, NULL, 4, 'Limpieza mensual programada', NULL, NULL, NULL, '2025-07-25 09:00:00', 4, NULL, NULL),
(9, 'Revisión cortadora banda', 8, 1, '2025-08-15', NULL, NULL, 1, 3, 350.00, NULL, 1, 'Mantenimiento preventivo trimestral', NULL, NULL, NULL, '2025-08-01 10:30:00', 1, NULL, NULL),
(10, 'Calibración soldadora backup', 6, 3, '2025-09-01', NULL, NULL, 1, 3, 180.00, NULL, 3, 'Calibración semestral equipo backup', NULL, NULL, NULL, '2025-08-20 14:00:00', 3, NULL, NULL);

SELECT ':)' as mensaje;