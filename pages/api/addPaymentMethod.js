import { checkPaymentMethodExists } from '@/lib';
import stripe from '@/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { stripeCustomerId, cardInfo } = req.body;
      const { id, brand, last4 } = cardInfo;

      const methodExists = await checkPaymentMethodExists(
        stripe,
        stripeCustomerId,
        brand,
        last4
      );

      if (methodExists) {
        console.log('This payment method is already added.');
        throw new Error('This payment method is already added.');
      }

      // Attach the payment method to the customer
      const payment = await stripe.paymentMethods.attach(id, {
        customer: stripeCustomerId,
      });

      res.status(201).json({ success: true, payment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
