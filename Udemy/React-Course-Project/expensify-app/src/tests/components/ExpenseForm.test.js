import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import { shallow } from 'enzyme';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import expenses from '../fixtures/expenses';

// test Expense form default data
it('should render Expense form correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

// test Expense form  with expense data
it('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

// should render error
it('should render error for correctly for invalid submission', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

// set description on input change
it('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = 'new Description';
  wrapper.find('input').at(0).simulate('change', {
    target: { value },
  });
  expect(wrapper.state('description')).toBe(value);
});

// set note on textarea change
it('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = 'new note';
  wrapper.find('textarea').simulate('change', {
    target: { value },
  });

  expect(wrapper.state('note')).toBe(value);
});

// set amount if valid input
it('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = '12.22';
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });

  expect(wrapper.state('amount')).toBe(value);
});

// set amount if invalid input
it('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);

  const value = '12.224';
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });

  expect(wrapper.state('amount')).toBe('');
});

// call on Submit prop for valid form submission
it('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[1].description,
    amount: expenses[1].amount,
    note: expenses[1].note,
    createdAt: expenses[1].createdAt,
  });
});

// set new date on date change
it('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();

  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

// set calendar focus on change
it('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calenderFocused')).toEqual(focused);
});
