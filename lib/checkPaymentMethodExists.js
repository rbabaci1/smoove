const checkPaymentMethodExists = async (
  stripe,
  stripeCustomerId,
  brand,
  last4
) => {
  const { data: existingPaymentMethods } = await stripe.paymentMethods.list({
    customer: stripeCustomerId,
    type: 'card',
  });

  const methodExists = existingPaymentMethods.some(
    method => method.card.brand === brand && method.card.last4 === last4
  );

  return methodExists;
};

export default checkPaymentMethodExists;
