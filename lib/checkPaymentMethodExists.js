import { getDoc } from 'firebase/firestore';

const checkPaymentMethodExists = async (userRef, paymentMethod) => {
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error(`User ${userRef.id} does not exist.`);
  }

  const existingMethods = userSnapshot.data().paymentMethods || [];

  const cardInfo = {
    id: paymentMethod.id,
    brand: paymentMethod.card.brand,
    last4: paymentMethod.card.last4,
  };

  const methodExists = existingMethods.some(
    method => method.brand === cardInfo.brand && method.last4 === cardInfo.last4
  );

  return { methodExists, cardInfo, userSnapshot };
};

export default checkPaymentMethodExists;
