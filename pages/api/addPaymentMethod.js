import stripe from '@/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId, stripeCustomerId } = req.body;

      // Attach the payment method to the customer
      const payment = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: stripeCustomerId,
      });

      res.status(201).json({ success: true, payment });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
