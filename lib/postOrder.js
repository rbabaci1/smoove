import { postOrderToFirestore, sendSlackMessage, sendSms } from '@/lib';

const postOrder = async (user, order) => {
  try {
    await postOrderToFirestore(user, order);
    await sendSlackMessage(user, order);
    await sendSms(
      user.phoneNumber,
      'Your order has been created! One of our closest crews will contact you soon.'
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export default postOrder;
