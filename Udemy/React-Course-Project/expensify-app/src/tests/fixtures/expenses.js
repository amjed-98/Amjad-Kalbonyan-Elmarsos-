import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'gym',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'rent',
    note: '',
    amount: 1955000,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
  },
  {
    id: '3',
    description: 'card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf(),
  },
];

export default expenses;

const getExpenseTotal = (expenses) => {
  return expenses.reduce((expense, acc) => expense.amount + acc.amount);
};
const total = getExpenseTotal(expenses);
