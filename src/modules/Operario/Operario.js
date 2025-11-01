export default class Operario {
  constructor() {
    this.trabajos = [
      {
        id: 1,
        titulo: 'Reparación de Motor Principal',
        estado: 'pendiente',
        prioridad: 'alta',
        cliente: 'Juan Pérez García'
      },
      {
        id: 2,
        titulo: 'Cambio de Aceite y Filtros',
        estado: 'en_proceso',
        prioridad: 'media',
        cliente: 'María González López'
      },
      {
        id: 3,
        titulo: 'Revisión Sistema Eléctrico',
        estado: 'completado',
        prioridad: 'media',
        cliente: 'Carlos Rodríguez'
      }
    ];
  }

  getAll() {
    return this.trabajos;
  }

  getById(id) {
    return this.trabajos.find(t => t.id === id);
  }

  create(trabajo) {
    const newTrabajo = { id: this.trabajos.length + 1, ...trabajo };
    this.trabajos.push(newTrabajo);
    return newTrabajo;
  }

  update(id, data) {
    const index = this.trabajos.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.trabajos[index] = { ...this.trabajos[index], ...data };
    return this.trabajos[index];
  }

  delete(id) {
    const index = this.trabajos.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.trabajos.splice(index, 1);
    return true;
  }
}

