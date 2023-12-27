import {defaultCellStyles} from '@/constans';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_COL_WIDTH = 250;
const DEFAULT_ROW_HEIGHT = 30;

function getWidth(state, index) {
  return (state.colState[index] || DEFAULT_COL_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state.rowState[index] || DEFAULT_ROW_HEIGHT) + 'px';
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id] || '';
    const styles = Object.keys(defaultCellStyles);

    return `
      <div
          class="cell"
          contenteditable
          data-col="${col}"
          data-type="cell"
          data-id="${id}"
          style="width: ${getWidth(state, col)}"
      >
        ${data}
      </div>
    `;
  };
}

function createCol({content, index, width}) {
  return `
    <div
      class="column"
      data-type="resizeble"
      data-col="${index}"
      style="width: ${width}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(state, index, content) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div
      class="row"
      data-type="resizeble"
      data-row="${index}"
      style="height:
      ${getHeight(state, index)}"
    >
      <div class="row-info">
        ${index || '' }
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
}

function stringFromChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function dataForCol(state) {
  return (content, index) => {
    return {content, index, width: getWidth(state, index)};
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(stringFromChar)
      .map(dataForCol(state))
      .map(createCol)
      .join('');

  rows.push(createRow(state, null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(state, row + 1, cols));
  }

  return rows.join('');
}

