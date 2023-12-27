import {defaultCellStyles, defaultTitle} from '@/constans';
import {storage} from '@core/utils';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {}, // {'0:1': 'text in cell'}
  currentState: '',
  currentStyles: defaultCellStyles,
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
