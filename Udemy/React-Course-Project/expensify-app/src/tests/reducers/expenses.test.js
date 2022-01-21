import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
it('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

// remove expense by id found
it('should remove expense by id if found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

it('shoud not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// add expense
it('should add expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '13',
      description: 'golf',
      note: '',
      createdAt: 2000,
      amount: 2321,
    },
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

// edit expense matched id
it('should edit expense if matched id', () => {
  const amount = 12312312;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

// edit expense with no matched id
it('should not edit expense if not matched id', () => {
  const amount = 12312312;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// set expense
it('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]],
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
