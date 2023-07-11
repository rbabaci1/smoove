import { db } from '@/firebase/firebase.config';
import { doc, collection, addDoc } from 'firebase/firestore';

const postOrder = async (userId, order) => {
  try {
    const userRef = doc(db, 'users', userId);
    const ordersRef = collection(userRef, 'orders');

    const newOrderRef = await addDoc(ordersRef, order);

    console.log('Order submitted successfully with ID:', newOrderRef.id);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default postOrder;
