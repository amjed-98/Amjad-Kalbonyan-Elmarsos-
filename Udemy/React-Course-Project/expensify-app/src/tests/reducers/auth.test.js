import authReducer from '../../reducers/auth';

it('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uuid: 'abc',
  };
  const state = authReducer({}, action);

  expect(state.uid).toEqual(action.uid);
});

it('should set uid for login', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({ uid: 'any' }, action);
  expect(state).toEqual({});
});
