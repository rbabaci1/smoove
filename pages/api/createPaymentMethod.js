// import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
// import { stripe } from '../../utils/stripe'; // Stripe initialization code

// export default async function createPaymentMethod(req, res) {
//   const { userId, paymentMethodId } = req.body;

//   try {
//     const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

//     const db = getFirestore();
//     const usersCollection = collection(db, 'users');
//     const userDoc = doc(usersCollection, userId);
//     await setDoc(userDoc, { paymentMethod });

//     res
//       .status(200)
//       .json({ message: 'Payment method created and saved successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create payment method.' });
//   }
// }
