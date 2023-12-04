const CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, col) {
  return `
    <div class="cell" contenteditable data-col="${col}">
    </div>
  `;
}

function createCol(content, index) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div class="row" data-type="resizeble">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(stringFromChar)
      .map(createCol)
      .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cols = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');

    rows.push(createRow(i + 1, cols));
  }

  return rows.join('');
}

