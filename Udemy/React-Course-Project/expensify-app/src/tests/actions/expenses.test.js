import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import db, { get, ref, set } from '../../firebase/firebase';
import 'regenerator-runtime/runtime';

const createMockStore = configureMockStore([thunk]);

const uid = 'thisIsMyTestUid';
const defaultAuthState = { auth: { uid } };
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  set(ref(db, `users/${uid}/expenses`), expensesData).then(() => done());
});

// Remove Expense
it('should setup remove action Object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});

it('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });

      return get(ref(db, `users/${uid}/expenses/${id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

// Edit Expense
it('should setup edit action Object', () => {
  const action = editExpense('123', { note: 'updated note' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'updated note',
    },
  });
});

// it('should edit Expense from firebase', (done) => {
//   const store = createMockStore(defaultAuthState);
//   const id = expenses[0].id;
//   const updates = { amount: 202 };

//   store.dispatch(startEditExpense(id, updates)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'EDIT_EXPENSE',
//       id,
//       updates,
//     });
//     return get(ref(db, `users/${uid}/expenses/${id}`)).then((snapshot) => {
//       expect(snapshot.val().amount).toBe(updates.amount);
//       done();
//     });
//   });
// });

// Add Expense with provided value
it('should setup add expense action Object with provided value', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

// add expense to database and store
it('should add expense to database and store', async () => {
  const store = createMockStore(defaultAuthState);

  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'this one is better',
    createdAt: 1000,
  };

  await store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });

    get(ref(db, `users/${uid}/expenses/${actions[0].expense.id}`)).then(
      (snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
      }
    );
  });
});

it('should add expense with defaults to database and store', async () => {
  const store = createMockStore(defaultAuthState);

  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  };

  await store.dispatch(startAddExpense({})).then(async () => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults,
      },
    });

    await get(ref(db, `users/${uid}/expenses/${actions[0].expense.id}`)).then(
      (snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
      }
    );
  });
});

// set Expense
it('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

it('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});
