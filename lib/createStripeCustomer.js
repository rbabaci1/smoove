import { db } from '@/firebase/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';

const createStripeCustomer = async (uid, name, email, phone) => {
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
    console.log('Stripe customer created successfully:', customer);

    // save Stripe customer ID in Firestore
    const userRef = doc(db, 'users', uid);

    await setDoc(userRef, { stripeCustomerId: customer.id }, { merge: true });
  } else {
    console.error('Failed to create Stripe customer:', res);
  }
};

export default createStripeCustomer;
