import { useEffect, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';

const AddPaymentMethod = () => {
  const [cardInfo, setCardInfo] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    zipCode: '',
  });
  const [cardNumberError, setCardNumberError] = useState(false);

  const handleCardNumberChange = e => {
    setCardNumberError(false);
    setCardInfo({ ...cardInfo, cardNumber: e.target.value });
  };
  const handleCardExpiryChange = e => {
    setCardInfo({ ...cardInfo, expiry: e.target.value });
  };
  const handleCardCVCChange = e => {
    setCardInfo({ ...cardInfo, cvc: e.target.value });
  };

  const handleCardNumberError = e => {
    setCardNumberError(true);
    console.log(e);
  };

  const handleChange = e => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // !!! Send card info to backend

    console.log(cardInfo);
  };

  return (
    <div className={styles.container}>
      <h4>Type your card number</h4>

      <form onSubmit={handleSubmit}>
        <CreditCardInput
          cardNumberInputProps={{
            value: cardInfo.cardNumber,
            onChange: handleCardNumberChange,
          }}
          cardExpiryInputProps={{
            value: cardInfo.expiry,
            onChange: handleCardExpiryChange,
          }}
          cardCVCInputProps={{
            value: cardInfo.cvc,
            onChange: handleCardCVCChange,
          }}
          onError={handleCardNumberError}
          containerClassName={styles.cardInputContainer}
          dangerTextClassName={styles.errorText}
          fieldClassName={styles.inputField}
        />

        <span className={styles.encryptText}>
          This is a payment secured with 256-bit SSL encryption 🔐
        </span>

        <section className={styles.extraInfo}>
          <input
            value={cardInfo.name}
            name='name'
            type='text'
            placeholder='Name on card'
            onChange={handleChange}
            required
          />
          <input
            value={cardInfo.zipCode}
            name='zipCode'
            type='text'
            placeholder='ZIP code'
            onChange={handleChange}
            required
          />
        </section>

        <AnimatePresence>
          {!cardNumberError &&
            cardInfo.cardNumber &&
            cardInfo.expiry &&
            cardInfo.cvc &&
            cardInfo.name &&
            cardInfo.zipCode && (
              <motion.button
                type='submit'
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Add card
              </motion.button>
            )}
        </AnimatePresence>
      </form>

      <div className={styles.assureCustomer}>
        <span>Rest assured! </span>
        No charges until your move is done. Cancel anytime without extra fees.
      </div>
    </div>
  );
};

export default AddPaymentMethod;
