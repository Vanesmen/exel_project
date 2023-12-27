import {$} from '@/core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, shuldResize, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions';
import {defaultCellStyles} from '@/constans';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(30, this.store.getState());
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');

    this.selectCell($cell);

    this.$on('Formula:onInput', text => {
      this.selection.current.text(text);
      this.updateTextInStore();
    });

    this.$on('Formula:done', text => {
      this.selection.current.focus();
    });

    this.$on('Toolbar:applyStyle', styles => {
      this.selection.applyStyle(styles);
      console.log('Toolbar:applyStyle Table', styles);
    });

    // test
    // this.$subscribe(state => {
    //   console.log('Table state', state);
    // });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:select', $cell);
    this.updateTextInStore();

    const styles = $cell.getStyles(Object.keys(defaultCellStyles));
    this.$dispatch(actions.changeStyles());

    console.log('selectCell', styles);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));

      // test
      console.log('Resize data', data);
    } catch (error) {
      console.warn('Resize error:', error.message);
    }
  }

  onMousedown(event) {
    if (shuldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup(cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore() {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: this.selection.current.text(),
    }));
  }

  onInput() {
    // this.$emit('Table:input', this.selection.current);

    this.updateTextInStore();
  }
}
