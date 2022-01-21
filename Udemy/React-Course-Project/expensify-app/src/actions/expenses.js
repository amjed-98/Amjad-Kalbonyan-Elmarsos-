import db, { push, ref, get, remove, update } from '../firebase/firebase';

// add Expense
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    return push(ref(db, `users/${uid}/expenses`), expense).then((ref) => {
      dispatch(addExpense({ id: ref.key, ...expense }));
    });
  };
};

// remove Expense
export const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id });

// start remove Expense
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return remove(ref(db, `users/${uid}/expenses/${id}`)).then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// edit Expense
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return update(ref(db, `users/${uid}/expenses/${id}`), updates).then(() => {
      dispatch(editExpense({ id, updates }));
    });
  };
};

// set Expenses
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return get(ref(db, `users/${uid}/expenses`)).then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      dispatch(setExpenses(expenses));
    });
  };
};
