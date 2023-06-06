// import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// import { auth } from '@/firebase/firebase.config';

// import { getPaymentMethods } from '@/lib';
import { AddPaymentMethod } from '@/components';
import styles from './styles.module.scss';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const userId = user?.uid;

  // useEffect(() => {
  //   const fetchPaymentMethods = async () => {
  //     try {
  //       const methods = await getPaymentMethods(userId);
  //     } catch (error) {
  //       console.error('Failed to fetch payment methods:', error);
  //     }
  //   };

  //   if (userId) fetchPaymentMethods();
  // }, [userId]);

  const handleSubmit = e => {
    e.preventDefault();

    console.log('submitting payment method');
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardNumber}>
        <h3>Payment Information</h3>

        {paymentMethods.length > 0 ? (
          <select>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
            <option value='option4'>Option 4</option>
          </select>
        ) : (
          <section className={styles.cardNumber__input}>
            <AddPaymentMethod />
          </section>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStep;
