export class Emmiter {
  constructor() {
    this.listeners = {};
  }

  // Dispatch, fire etc
  // Уведомляем слушателей, если они есть
  // table.emit('table:select', {a: 1});
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return;
    }

    this.listeners[event].forEach(fn => {
      fn(...args);
    });

    return true;
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // formula.sunscribe('table:select', () => {});
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event]
      = this.listeners[event].filter(listener => listener !== fn);
    };
  }
}

// Example

// const emit = new Emmiter;
// const unsub
//   = emit.subscribe('ivan:gisev', data => console.log('Go subscriber', data));
// emit.emit('ivan:gisev', 'Успех!');

// setTimeout(() => {
//   emit.emit('ivan:gisev', 'After 2000');
// }, 2000);

// setTimeout(() => {
//   unsub();
// }, 5000);

// setTimeout(() => {
//   emit.emit('ivan:gisev', 'After 10000');
// }, 10000);
