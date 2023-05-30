import { db } from '@/firebase/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const createStripeCustomer = async (uid, name, email, phone) => {
  try {
    const res = await fetch('/api/createStripeCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        name,
        email,
        phone,
      }),
    });

    if (res.ok) {
      const customer = await res.json();
      // Save Stripe customer ID in Firestore
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { stripeCustomerId: customer.id }, { merge: true });
    } else {
      console.error('Failed to create Stripe customer:', res);
      // Handle the error or show appropriate feedback to the user
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error or show appropriate feedback to the user
  }
};

export default createStripeCustomer;
