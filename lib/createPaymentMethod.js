const createPaymentMethod = async (stripe, elements, CardElement) => {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  });

  if (error) {
    throw new Error(`Failed to create payment method: ${error.message}`);
  }

  return paymentMethod;
};

export default createPaymentMethod;
