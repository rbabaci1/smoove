import { db } from '@/firebase/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const getPaymentMethods = async (userId = null) => {
  try {
    // const querySnapshot = await getDocs(collection(db, 'paymentMethods'));
    // const paymentMethods = querySnapshot.docs.map(doc => doc.data());
    // const q = query(
    //   collection(db, 'paymentMethods'),
    //   where('userId', '==', userId)
    // );
    // const querySnapshot = await getDocs(q);
    // const paymentMethods = querySnapshot.docs.map(doc => doc.data());
    // return paymentMethods;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error getting payment methods:', error);
    throw error;
  }
};

export default getPaymentMethods;
