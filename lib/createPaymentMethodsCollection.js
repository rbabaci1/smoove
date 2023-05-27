import { db } from '@/firebase/firebase.config';
import { collection, doc, addDoc } from 'firebase/firestore';

const createPaymentMethodsCollection = async userId => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const paymentMethodsCollectionRef = collection(
      userDocRef,
      'paymentMethods'
    );
    await addDoc(paymentMethodsCollectionRef, { paymentMethods: [] });
  } catch (error) {
    console.error('Failed to create PaymentMethods collection:', error);
  }
};

export default createPaymentMethodsCollection;
