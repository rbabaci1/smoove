import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-UoRpVUAgIN0JcGGm1GjYKbw0jeZa38k',
  authDomain: 'smoove-b122f.firebaseapp.com',
  projectId: 'smoove-b122f',
  storageBucket: 'smoove-b122f.appspot.com',
  messagingSenderId: '433751437406',
  appId: '1:433751437406:web:dc51f31ab4e7ea082e44cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// auth.settings.appVerificationDisabledForTesting = true;
export default app;
