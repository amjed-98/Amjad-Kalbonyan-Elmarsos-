import moment from 'moment';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from '../../actions/filters';

// set StartDate
it('should generate set start date action object', () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

// set endDate
it('should genanrate set end date action object', () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});

// set TextFilter with provided values
it('should generate set Text filter action Object with provided value', () => {
  const text = 'bill';
  const action = setTextFilter(text);

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text,
  });
});

// set TextFilter with default values
it('should generate set text filter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});

// sortByDate
it('should generate sortByDate action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

// sortByAmount
it('should generate sortByAmount', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});
