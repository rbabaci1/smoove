import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { uid, name, email, phone } = req.body;

  // create customer on Stripe
  try {
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      metadata: { firebaseUID: uid },
    });

    return res.status(201).json(customer);
  } catch (error) {
    return res.status(400).json({ error: { message: error.message } });
  }
}
