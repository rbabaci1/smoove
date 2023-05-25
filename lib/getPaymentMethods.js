import { db } from '@/firebase/firebase.config';
import { collection, doc, getDocs } from 'firebase/firestore';

const getPaymentMethods = async userId => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const paymentMethodsCollectionRef = collection(
      userDocRef,
      'paymentMethods'
    );

    
    const paymentMethodsQuerySnapshot = await getDocs(
      paymentMethodsCollectionRef
    );

    const paymentMethods = paymentMethodsQuerySnapshot.docs.map(doc =>
      doc.data()
    );

    return paymentMethods;
  } catch (error) {
    console.error('Failed to retrieve payment methods:', error);
    return [];
  }
};

export default getPaymentMethods;
