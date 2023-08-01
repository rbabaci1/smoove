import { postOrderToFirestore, sendSlackMessage, sendSms } from '@/lib';

const postOrder = async (user, order) => {
  try {
    const orderId = await postOrderToFirestore(user, order);

    await sendSlackMessage(user, { orderId, ...order });
    await sendSms(
      user.phoneNumber,
      `Your move with a ${order.vehicleType} has been booked for pick-up on ${order.movingDate} between ${order.movingWindow}. You'll be contacted by the closest crew to your pick-up address at ${order.phoneNumber}`
    );

    await sendSms(
      '+15106467743',
      `New order has been placed!\nA move with a ${order.vehicleType} has been booked for pick-up on ${order.movingDate} between ${order.movingWindow}.\nCustomer phone #: ${order.phoneNumber}`
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export default postOrder;
