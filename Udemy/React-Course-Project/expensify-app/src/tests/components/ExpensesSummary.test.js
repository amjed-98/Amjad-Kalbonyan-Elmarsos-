import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpensesSummary';

it('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={1} expensesTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={32} expensesTotal={223131235} />
  );
  expect(wrapper).toMatchSnapshot();
});
