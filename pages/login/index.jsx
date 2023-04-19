import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './styles.module.scss';
import { Navbar, ErrorMessage } from '@/components';
import { Footer } from '@/containers';

// temporary verification code length
const verificationCodeLength = 4;
const CODE = '1234';

const Login = () => {
  const phoneNumberInputRef = useRef(null);
  const verificationCodeInputRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [previousVerificationCode, setPreviousVerificationCode] = useState('');

  const [sendingVerificationCode, setSendingVerificationCode] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

  const [phoneNumberErrors, setPhoneNumberErrors] = useState('');
  const [verificationCodeErrors, setVerificationCodeErrors] = useState('');

  useEffect(() => {
    if (!verificationCodeSent && phoneNumberInputRef.current) {
      phoneNumberInputRef.current.focus();
    } else if (verificationCodeInputRef.current) {
      if (verificationCodeSent || verifyingCode) {
        verificationCodeInputRef.current.focus();
      }
    }
  }, [verificationCodeSent, verifyingCode]);

  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);

    if (value !== undefined && isPossiblePhoneNumber(value) === true) {
      setPhoneNumberErrors('');
    }
  };

  const handleVerificationCodeChange = e => {
    const verificationCode = e.target.value;
    const event = {
      target: { value: verificationCode },
      key: 'Enter',
      keyCode: 13,
    };

    setVerificationCodeErrors('');
    setVerificationCode(verificationCode);

    // verify code automatically if code length is equal to verificationCodeLength
    if (verificationCode.length === verificationCodeLength) {
      if (previousVerificationCode !== verificationCode) {
        verifyCode(event);
      } else {
        setVerificationCodeErrors('Same verification code. Please try again.');
      }
    }
  };

  const verifyCode = event => {
    const {
      key,
      keyCode,
      target: { value: verificationCode },
    } = event;

    if (key === 'Enter' || keyCode === 13) {
      if (verificationCode.length === 0) {
        setVerificationCodeErrors('Please enter a verification code');
      } else if (verificationCode.length < verificationCodeLength) {
        setVerificationCodeErrors('Wrong verification code. Please try again.');
      } else if (previousVerificationCode === verificationCode) {
        setVerificationCodeErrors('Same verification code. Please try again.');
      } else {
        setVerifyingCode(true);
        setVerificationCodeErrors('');
        setPreviousVerificationCode(verificationCode);

        setTimeout(() => {
          setVerifyingCode(false);

          // !! verify code with server and redirect to dashboard if successful
          if (verificationCode === CODE) {
            // redirect to dashboard
            console.log('SUCCESS');
          } else {
            setVerificationCodeErrors(
              'Wrong verification code. Please try again.'
            );
          }
        }, 2000);
      }
    }
  };

  const resendCode = () => {
    setVerificationCode('');
    setVerificationCodeErrors('');
    setVerificationCodeSent(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isPossiblePhoneNumber(phoneNumber) === true) {
      setSendingVerificationCode(true);

      setTimeout(() => {
        setSendingVerificationCode(false);
        setVerificationCodeSent(true);
      }, 2000);
    } else {
      if (phoneNumber === '') {
        setPhoneNumberErrors('Please enter a phone number');
      } else {
        setPhoneNumberErrors('Please enter a valid phone number');
      }
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
          <motion.section
            className={styles.header}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h1>Hello there!</h1>
            <span>Tap your digits, gain access!</span>
          </motion.section>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={styles.phoneNumberInput}
            >
              <PhoneInput
                placeholder='Enter phone number'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                country='US'
                defaultCountry='US'
                limitMaxLength={true}
                international={false}
                className={`${
                  phoneNumberErrors.length ? styles.borderError : ''
                } ${styles.input}`}
                disabled={sendingVerificationCode || verificationCodeSent}
                ref={phoneNumberInputRef}
              />

              <section className={styles.textError}>
                <AnimatePresence>
                  {phoneNumberErrors.length && (
                    <ErrorMessage message={phoneNumberErrors} />
                  )}
                </AnimatePresence>
              </section>
            </motion.div>

            <div className={styles.verificationCode}>
              <AnimatePresence>
                {verificationCodeSent ? (
                  <>
                    <motion.input
                      type='tel'
                      placeholder='Enter verification code'
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      onChange={handleVerificationCodeChange}
                      onKeyDown={verifyCode}
                      value={verificationCode}
                      className={
                        verificationCodeErrors.length ? styles.borderError : ''
                      }
                      disabled={verifyingCode}
                      ref={verificationCodeInputRef}
                    />

                    <section className={styles.textError}>
                      <AnimatePresence>
                        {verificationCodeErrors.length && (
                          <ErrorMessage message={verificationCodeErrors} />
                        )}
                      </AnimatePresence>
                    </section>

                    {verifyingCode || sendingVerificationCode ? (
                      <AiOutlineLoading3Quarters />
                    ) : (
                      <span className={styles.resendCode} onClick={resendCode}>
                        Resend?
                      </span>
                    )}
                  </>
                ) : (
                  <motion.button
                    type='submit'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    disabled={sendingVerificationCode}
                  >
                    {sendingVerificationCode ? (
                      <AiOutlineLoading3Quarters />
                    ) : (
                      'Request verification code'
                    )}
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
