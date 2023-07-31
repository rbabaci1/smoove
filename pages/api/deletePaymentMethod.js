import { stripe } from '@/stripe/stripe.config'; // Replace with your Stripe configuration

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { paymentMethodId } = req.body;

    // Validate the inputs (you can add more validation if needed)
    if (!paymentMethodId) {
      return res
        .status(400)
        .json({ message: 'Invalid request. Missing required data.' });
    }

    // Delete the credit card from Stripe
    const deletedCard = await stripe.paymentMethods.detach(paymentMethodId);

    return res
      .status(200)
      .json({ deletedCard, message: 'Payment method deleted successfully.' });
  } catch (error) {
    console.error('Error deleting payment method:', error);
    return res
      .status(500)
      .json({ message: 'Failed to delete payment method. Please try again.' });
  }
}
