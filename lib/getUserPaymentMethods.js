import { db, doc, getDoc } from '@/firebase/firebase.config';

export async function getUserPaymentMethods(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new Error('User does not exist.');
    }

    const { stripeCustomerId } = userSnapshot.data();

    const response = await fetch('/api/getPaymentMethods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stripeCustomerId }),
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve your payment methods.');
    }

    const paymentMethods = await response.json();

    return paymentMethods;
  } catch (error) {
    console.error('Failed to fetch payment methods:', error);
    throw new Error('Failed to retrieve your payment methods.');
  }
}

export default getUserPaymentMethods;
