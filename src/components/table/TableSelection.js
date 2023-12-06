export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clearAll();
    this.group.push($el);
    this.current = $el;
    $el.addClass(TableSelection.className).focus();
  }

  clearAll() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup(group = []) {
    this.clearAll();
    this.group = group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }
}
