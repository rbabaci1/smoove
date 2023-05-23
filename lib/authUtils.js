import { db } from '@/firebase/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';

const createPaymentMethodsCollection = async userId => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const paymentMethodsCollectionRef = collection(
      userDocRef,
      'paymentMethods'
    );
    const paymentMethodsDocRef = doc(paymentMethodsCollectionRef, 'initial');
    await setDoc(paymentMethodsDocRef, { paymentMethods: [] });
  } catch (error) {
    console.error('Failed to create PaymentMethods collection:', error);
  }
};

export default createPaymentMethodsCollection;
