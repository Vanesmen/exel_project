import {ExcelStateComponent} from '@/core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '@/core/dom';
import {defaultCellStyles} from '@/constans';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    const initialState = defaultCellStyles;

    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    console.log('sssss', changes);
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];

      this.$emit('Toolbar:applyStyle', value);

      this.setState({[key]: value[key]});
      console.log('Toolbar click', this.state);
    }
  }
}
