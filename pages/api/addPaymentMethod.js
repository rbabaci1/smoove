import { db, doc, getDoc } from '@/firebase/firebase.config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { cardInfo, stripeCustomerId } = req.body;
  const { name, cardNumber, expiry, cvc, zipCode } = cardInfo;

  // console.log({ stripe });

  try {
    // Attach the payment method to the customer
    // const attachedPaymentMethod = await stripe.paymentMethods.attach(
    //   paymentMethod,
    //   {
    //     customer: stripeCustomerId,
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
