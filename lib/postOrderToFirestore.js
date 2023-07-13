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

    await addDoc(ordersRef, updatedOrder);

    // Additional operations or code after successfully adding the order to Firestore
  } catch (error) {
    // Handle the error based on your requirements
    console.error(
      'An error occurred while adding the order to Firestore:',
      error
    );

    // Throw a custom error or perform alternative actions
    throw new Error('Failed to add the order to Firestore. Please try again!');
  }
};

export default postOrderToFirestore;
