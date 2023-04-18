import { useState } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import styles from './styles.module.scss';
import { Navbar } from '@/components';
import { Footer } from '@/containers';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendingVerificationCode, setSendingVerificationCode] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);

  const handleSubmit = formData => {
    // console.log(isPossiblePhoneNumber(phoneNumber) === true);

    if (isPossiblePhoneNumber(phoneNumber) === true) {
      setSendingVerificationCode(true);

      setTimeout(() => {
        setSendingVerificationCode(false);
        setVerificationCodeSent(true);
        setShowVerificationCodeInput(true);
      }, 2000);
    } else {
      console.log('Invalid phone number');
    }
  };

  return (
    <>
      <Head>
        <title>Smoove - login</title>
        <meta
          name='description'
          content='Access your Smoove account dashboard and manage your moves with ease. Login to Smoove and schedule same-day deliveries, view past orders, and customize your settings. Join our trusted moving service for fast and reliable delivery services, and enjoy personalized support from our knowledgeable team. Sign up now and enhance your business with free flyers. Join Smoove for a seamless experience in managing your moves.'
        />
      </Head>

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <section className={styles.header}>
            <h1>Ahoy there!</h1>
            <span>Tap your digits, gain access!</span>
          </section>

          <form onSubmit={handleSubmit}>
            <PhoneInput
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={setPhoneNumber}
              country='US'
              defaultCountry='US'
              limitMaxLength={true}
            />

            <div className={styles.verificationCode}>
              <AnimatePresence>
                {!showVerificationCodeInput ? (
                  <motion.input
                    type='text'
                    placeholder='Enter verification code'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  />
                ) : (
                  <motion.button
                    type='submit'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {sendingVerificationCode
                      ? 'Sending...'
                      : 'Request verification code'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
