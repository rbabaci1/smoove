import { db, doc, collection, updateDoc } from '@/firebase/firebase.config';

const updateOrderStatus = async (userId, orderId, newStatus) => {
  try {
    const userRef = doc(db, 'users', userId);
    const orderRef = doc(collection(userRef, 'orders'), orderId);

    await updateDoc(orderRef, { status: newStatus });

    console.log('Order status updated successfully!');
  } catch (error) {
    console.error('An error occurred while updating the order status:', error);
    throw new Error('Failed to update the order status. Please try again!');
  }
};

export default updateOrderStatus;
