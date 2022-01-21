import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

it('should return 0 if no expenses', () => {
  const res = expensesTotal([]);
  expect(res).toBe(0);
});

it('should correctly add up a single expense', () => {
  const res = expensesTotal([expenses[0]]);
  expect(res).toBe(195);
});

it('should correctly add up a multi expense', () => {
  const res = expensesTotal(expenses);
  expect(res).toBe(1959695);
});
