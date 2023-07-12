const functions = require('firebase-functions');

exports.sendSMSOnOrderChange = functions.firestore
  .document('users/{userId}/orders/{orderId}')
  .onWrite(async (change, context) => {
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
