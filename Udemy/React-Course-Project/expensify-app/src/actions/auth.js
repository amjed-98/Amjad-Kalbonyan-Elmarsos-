import {
  auth,
  googleAuthProvider,
  signInWithPopup,
  signOut,
  signIn,
} from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () => {
  return () => {
    return signInWithPopup(auth, googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return signOut(auth);
  };
};
