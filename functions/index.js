// import twilio from 'twilio';

const { onDocumentWritten } = require('firebase-functions/v2/firestore');

// const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
// const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

exports.sendSMSOnOrderSubmit = onDocumentWritten(
  'users/{userId}/orders/{orderId}',
  event => {
    // If the document does not exist, it was deleted
    const document = event.data.after.data();

    console.log('Function triggered!');
    // ....
    console.log({ document });
  }
);
