// set text filter
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// sort by amount
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// sort by Date
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// set start date
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate,
});

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate,
});
export { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate };
