const functions = require('firebase-functions');

exports.sendSMSOnOrderChange = functions.firestore
  .document('users/{userId}/orders/{orderId}')
  .onWrite((change, context) => {
    const orderRef = change.after.ref;
    const newData = change.after.data();
    const oldData = change.before.data();

    // If the document was created
    if (!change.before.exists) {
      return orderRef.update({
        status: 'confirmed',
      });
    }

    // If the document was deleted
    if (!change.after.exists) {
      // Document deleted (onDelete logic)
      // Perform any necessary actions for document deletion
      return null;
    }

    // If the document was updated (onUpdate logic)
    // Example: Update status only if it has changed
    if (newData.status !== oldData.status) {
      return orderRef.update({
        status: 'confirmed',
      });
    }

    return null;
  });
