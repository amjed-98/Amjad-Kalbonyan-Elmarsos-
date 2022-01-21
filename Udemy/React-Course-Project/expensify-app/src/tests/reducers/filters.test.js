import moment from 'moment';
import filtersReducer from '../../reducers/filters';

// default values
it('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INTI' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

// sortby amount
it('should set sortby to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

// sort date
it('should set sortBy to amount', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    soryby: 'amount', // check if the sortby actually changes
  };
  const action = { type: 'SORT_BY_DATE' };

  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// set text filter
it('should set text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'bill',
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(action.text);
});

// set startDate filter
it('should set start date filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate);
});

it('should set end date filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
