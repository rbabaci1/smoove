import Stripe from 'stripe';

import { db } from '@/firebase/firebase.config';

import { doc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { customerId, paymentMethod } = req.body;

  const docRef = doc(db, 'users', customerId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return res.status(200).json({ found: true });
  }

  res.status(200).json({ test: 'docRef' });

  try {
    const userDoc = await db.doc(`users/${customerId}`).get();
    console.log(userDoc);

    // Attach the payment method to the customer
    // const attachedPaymentMethod = await stripe.paymentMethods.attach(
    //   paymentMethod,
    //   {
    //     customer: customerId,
    //   }
    // );

    // Set the payment method as the default for the customer (optional)
    // await stripe.customers.update(customerId, {
    //   invoice_settings: {
    //     default_payment_method: attachedPaymentMethod.id,
    //   },
    // });

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: { message: error.message } });
  }
}
