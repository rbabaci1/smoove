import {
  db,
  collection,
  getDocs,
  doc,
  getDoc,
} from '@/firebase/firebase.config';

export default async function getUserOrders(userId) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const ordersCollectionRef = collection(db, 'users', userId, 'orders');
      const ordersQuerySnapshot = await getDocs(ordersCollectionRef);

      return ordersQuerySnapshot.docs.map(orderDoc => orderDoc.data());
    }

    return [];
  } catch (error) {
    console.log(error);
  }
}
