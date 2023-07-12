import { db, doc, collection, addDoc } from '@/firebase/firebase.config';

const postOrder = async (user, order) => {
  try {
    const { uid: userId, phoneNumber } = user;
    const userRef = doc(db, 'users', userId);
    const ordersRef = collection(userRef, 'orders');

    //  remove typingValues from order addresses
    const updatedOrder = {
      ...order,
      addresses: {
        ...order.addresses,
      },
    };
    delete updatedOrder.addresses.typingValues;

    await addDoc(ordersRef, updatedOrder);

    // Call the API route to send SMS
    const response = await fetch('/api/sendSms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message:
          'Your order has been created! One of our closest crews will contact you soon.',
      }),
    });

    const data = await response.json();

    // Handle the API response
    if (response.ok) {
    } else {
      console.error({ message: data.message });
      throw new Error('Failed to send SMS. Please try again!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default postOrder;
