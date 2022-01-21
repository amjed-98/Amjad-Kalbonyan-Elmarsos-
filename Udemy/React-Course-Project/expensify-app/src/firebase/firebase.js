import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  get,
  onValue,
  onChildAdded,
  onChildChanged,
  push,
} from 'firebase/database';
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  signInWithRedirect,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export {
  db as default,
  ref,
  set,
  remove,
  update,
  get,
  onValue,
  onChildAdded,
  onChildChanged,
  push,
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithRedirect as signIn,
};

// set(ref(db, 'users'), {
//   username: 'd',
//   email: 'd',
//   location: {
//     city: 'gadddddddddddza',
//     country: 'palestine',
//   },
// });

// remove(ref(db, 'users/username'));

// update(ref(db, 'users/location'), { city: 'boston' });

// get(ref(db, 'users/location')).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   }
// });

// const value = onValue(ref(db, 'users/location'), (snapshot) => {
//   console.log(snapshot.val());
// });

// set(ref(db, 'users/location'), { city: 'aa' });
// set(ref(db, 'users/location'), { city: 'dd' });

// push(ref(db, 'expenses'), {
//   description: 'credit card',
//   note: 'pay',
//   amount: 11,
//   createdAt: 11 / 2 / 2020,
// });

// get(ref(db, 'expenses')).then((snapshot) => {
//   const expenses = [];
//   if (snapshot.exists()) {
//     snapshot.forEach((snap) =>
//       expenses.push({
//         id: snap.key,
//         ...snap.val(),
//       })
//     );
//   }
//   console.table(expenses);
// });

// onValue(ref(db, 'expenses'), (snapshot) => {
//   const expenses = [];
//   if (snapshot.exists()) {
//     snapshot.forEach((snap) =>
//       expenses.push({
//         id: snap.key,
//         ...snap.val(),
//       })
//     );
//   }

//   console.log(expenses);
//   console.log(2);
//   console.log(2);
// });
