//AQUI HAGAN LAS ASOCIASIONES DE LOS MODELOS --- RECUERDAME EN QUE PROYECTO DE GIT HABIA ASOCIACIONES???
const Usuario = require('./usuario');
const TelefonoUsuario = require('./telefonos_usuario');
const MateriaPrima = require('./materias_prima');
const Herramienta = require('./herramientas');
const Zona = require('./zona'); // si tienes esta tabla

// Asociaciones
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

// No hay relaciones con materias_prima ni herramientas por ahora

module.exports = {
  Usuario,
  TelefonoUsuario,
  MateriaPrima,
  Herramienta,
  Zona
};
