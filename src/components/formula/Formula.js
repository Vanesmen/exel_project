import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.formula = this.$root.find('#formula');

    this.$on('Table:select', $cell => {
      this.formula.text($cell.text());
    });

    // this.$on('Table:input', $cell => {
    //   this.formula.text($cell.text());
    // });

    // this.$subscribe(state => {
    //   console.log('Formula update');
    //   this.formula.text(state.currentText);
    // });
  }

  storeChanged(changes) {
    this.formula.text(changes.currentText);
    console.log('Formula get changes', changes.currentText);
  }

  onInput(event) {
    this.$emit('Formula:onInput', $(event.target).text());
  }

  onKeydown(event) {
    const KEYS = ['Enter', 'Tab'];

    if (KEYS.includes(event.key)) {
      event.preventDefault();

      this.$emit('Formula:done');
    }
  }
}
