// import twilio from 'twilio';

const functions = require('firebase-functions');

// const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
// const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

exports.sendSMSOnOrderChange = functions.firestore
  .document('users/{userId}/orders/{orderId}')
  .onWrite((change, context) => {
    const orderRef = change.after.ref;
    const newData = change.after.data();
    const oldData = change.before.data();

    // Check if the document was created
    if (!change.before.exists) {
      return orderRef.update({
        status: 'confirmed',
      });
    }

    // Check if the document was deleted
    if (!change.after.exists) {
      // Document deleted (onDelete logic)
      // Perform any necessary actions for document deletion
      return null;
    }

    // Document updated (onUpdate logic)

    // Example: Update status only if it has changed
    if (newData.status !== oldData.status) {
      return orderRef.update({
        status: 'confirmed',
      });
    }

    return null;
  });
