import { db, doc, collection, addDoc } from '@/firebase/firebase.config';

const postOrderToFirestore = async (user, order) => {
  try {
    const { uid: userId } = user;
    const userRef = doc(db, 'users', userId);
    const ordersRef = collection(userRef, 'orders');

    const updatedOrder = {
      ...order,
      addresses: {
        ...order.addresses,
      },
    };
    delete updatedOrder.addresses.typingValues;

    const docRef = await addDoc(ordersRef, updatedOrder);

    return docRef.id;
  } catch (error) {
    console.error(
      'An error occurred while adding the order to Firestore:',
      error
    );
    throw new Error('Failed to add the order to Firestore. Please try again!');
  }
};

export default postOrderToFirestore;
