import { db } from '@/firebase/firebase.config';
import { doc, collection, addDoc } from 'firebase/firestore';

// import twilio from 'twilio';

// const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
// const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

const postOrder = async (user, order) => {
  try {
    const { uid: userId, phoneNumber } = user;

    const userRef = doc(db, 'users', userId);
    const ordersRef = collection(userRef, 'orders');

    const newOrderRef = await addDoc(ordersRef, { ...order, phoneNumber });

    console.log('Order submitted successfully with ID:', newOrderRef.id);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default postOrder;
