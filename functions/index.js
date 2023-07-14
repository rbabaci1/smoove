const functions = require('firebase-functions');

exports.confirmOrderWhenPosted = functions.firestore
  .document('users/{userId}/orders/{orderId}')
  .onCreate(snapshot => {
    const orderRef = snapshot.ref;

    return orderRef.update({
      status: 'confirmed',
    });
  });
