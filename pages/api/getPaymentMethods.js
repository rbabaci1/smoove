import stripe from '@/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Method not allowed' });
    }

    try {
      const { stripeCustomerId } = req.body;

      const paymentMethods = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: 'card',
      });

      res.status(200).json(paymentMethods.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
