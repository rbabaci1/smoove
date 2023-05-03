import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { ErrorMessage } from '@/components';
import styles from './styles.module.scss';

// temporary verification code length
const verificationCodeLength = 4;
const CODE = '1234';

const Login = ({ animate = true }) => {
  const router = useRouter();
  const phoneNumberInputRef = useRef(null);
  const verificationCodeInputRef = useRef(null);
  // const [user, setUser] = useState(null);

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
    <div className={styles.container}>
      <div id='recaptcha-container'></div>

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={animate ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
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
            className={`${phoneNumberErrors.length ? styles.borderError : ''} ${
              styles.input
            }`}
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
  );
};

export default Login;
