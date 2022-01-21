import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

it('should render Header correctly', () => {
  const Wrapper = shallow(<Header startLogout={() => {}} />);
  expect(Wrapper).toMatchSnapshot();
});

it('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
