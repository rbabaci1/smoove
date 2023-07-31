import stripe from '@/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { cardId } = req.body;

    // Validate the inputs (you can add more validation if needed)
    if (!cardId) {
      return res
        .status(400)
        .json({ message: 'Invalid request. Missing required data.' });
    }

    // Delete the credit card from Stripe
    const deletedCard = await stripe.paymentMethods.detach(cardId);

    return res
      .status(200)
      .json({ deletedCard, message: 'Payment method deleted successfully.' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to delete payment method. Please try again.' });
  }
}
