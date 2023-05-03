import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB-KvoPulqUQT4x3oNQYgzjr1vwqYjSNKo',
  authDomain: 'smoove-3038a.firebaseapp.com',
  projectId: 'smoove-3038a',
  storageBucket: 'smoove-3038a.appspot.com',
  messagingSenderId: '673402948574',
  appId: '1:673402948574:web:195afb5de595dbeea2eb4f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
