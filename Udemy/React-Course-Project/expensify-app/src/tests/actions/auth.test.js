import { login, logout } from '../../actions/auth';

it('should generate login action Object', () => {
  const uid = 'abc';
  const action = login(uid);

  expect(action).toEqual({
    type: 'LOGIN',
    uid,
  });
});

it('should generate logout action Object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
