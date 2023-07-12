import { db, doc, collection, addDoc } from '@/firebase/firebase.config';

const postOrder = async (user, order) => {
  try {
    const { uid: userId, phoneNumber } = user;

    const userRef = doc(db, 'users', userId);
    const ordersRef = collection(userRef, 'orders');

    await addDoc(ordersRef, order);

    // Call the API route to send SMS
    const response = await fetch('/api/sendSms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message:
          '*** Your order has been created *** \n One of our closest crews will contact you soon!',
      }),
    });

    // Handle the API response
    if (response.ok) {
      const data = await response.json();
      console.log({ data }); // Log success message from the API
    } else {
      console.error('Failed to send SMS', { response });
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default postOrder;
