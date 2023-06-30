const attachPaymentMethod = async (stripeCustomerId, cardInfo) => {
  const res = await fetch('/api/addPaymentMethod', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      stripeCustomerId,
      cardInfo,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to attach payment method: ${data.message}`);
  }

  return data;
};

export default attachPaymentMethod;
