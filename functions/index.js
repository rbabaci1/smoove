// import twilio from 'twilio';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';

// const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
// const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

exports.sendSMSOnOrderSubmit = onDocumentWritten(
  'users/{userId}/orders/{orderId}',
  event => {
    // If the document does not exist, it was deleted
    const document = event.data.after.data();

    // ....
    console.log({ document });
  }
);

// exports.sendSMSOnOrderSubmit = functions.firestore
//   .document('users/{userId}/orders/{orderId}')
//   .onCreate((snapshot, context) => {
//     const orderData = snapshot.data();
//     const { userId, orderId } = context.params;

//     console.log('New order submitted:');
//     console.log('User ID:', userId);
//     console.log('Order ID:', orderId);
//     console.log('Order Data:', orderData);

//     return null; // Return null or a Promise if needed for async tasks
//   });
