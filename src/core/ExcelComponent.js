import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.onsubscribers = [];

    this.prepare();
  }

  prepare() {
    console.log('ExcelComponet prepare', this.name);
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.onsubscribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.onsubscribers.forEach(unsub => unsub());
  }
}
