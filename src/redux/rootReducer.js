import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, CHANGE_TITLE} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.resizeType === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)}; // id, width
    }

    case CHANGE_TEXT: {
      const field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      }; // id, width
    }

    case CHANGE_STYLES: {
      return {...state, currentStyles: action.data};
    }

    case CHANGE_TITLE: {
      return {...state, title: action.data};
    }

    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;

  return val;
}
