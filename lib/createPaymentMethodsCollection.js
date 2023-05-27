import { db } from '@/firebase/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const createPaymentMethodsCollection = async userId => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { paymentMethods: [] });
  } catch (error) {
    console.error('Failed to create PaymentMethods collection:', error);
  }
};

export default createPaymentMethodsCollection;
