import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

import { auth } from '@/firebase/firebase.config';
import { ErrorMessage } from '@/components';
import styles from './styles.module.scss';

// temporary verification code length
const verificationCodeLength = 6;

const Login = ({ animate = true }) => {
  // const router = useRouter();
  const phoneNumberInputRef = useRef(null);
  const verificationCodeInputRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [previousVerificationCode, setPreviousVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState('');

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

  let recaptchaVerifier = null;

  const clearRecaptcha = () => {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
  };

  const generateRecaptcha = () => {
    const loginContainer = document.getElementById('login-container');
    const reCaptchaContainer = document.createElement('div');
    reCaptchaContainer.id = 'recaptcha-container';

    // append recaptcha container to login container
    if (loginContainer) loginContainer.appendChild(reCaptchaContainer);

    recaptchaVerifier = new RecaptchaVerifier(
      reCaptchaContainer,
      {
        size: 'invisible',

        'expired-callback': async () => {
          // reCaptcha expired, reset the recaptchaVerifier and call it again
          clearRecaptcha();
          reCaptchaContainer.remove();
          generateRecaptcha();
        },
      },
      auth
    );
  };

  const sendVerificationCode = async () => {
    setSendingVerificationCode(true);

    try {
      const reCaptchaContainer = document.getElementById('recaptcha-container');

      // remove previous recaptcha container
      if (reCaptchaContainer) reCaptchaContainer.remove();
      generateRecaptcha();

      const response = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      setConfirmationResult(response);
      setSendingVerificationCode(false);
      setVerificationCodeSent(true);
      setPhoneNumberErrors('');
    } catch (error) {
      setSendingVerificationCode(false);
      setPhoneNumberErrors('Something went wrong. Please try again.');
      console.log(error.message);
    }
  };

  const verifyCode = async event => {
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

        try {
          const result = await confirmationResult.confirm(verificationCode);
          console.log(result);

          setVerifyingCode(false);
        } catch (error) {
          setVerifyingCode(false);
          setVerificationCodeErrors(
            'Wrong verification code. Please try again.'
          );
          console.log(error);
        }
      }
    }
  };

  const resendCode = () => {
    setVerificationCode('');
    setVerificationCodeErrors('');
    setVerificationCodeSent(false);
    clearRecaptcha();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isPossiblePhoneNumber(phoneNumber) === true) {
      sendVerificationCode();
    } else {
      if (phoneNumber === '') {
        setPhoneNumberErrors('Please enter a phone number');
      } else {
        setPhoneNumberErrors('Please enter a valid phone number');
      }
    }
  };

  return (
    <div id='login-container' className={styles.container}>
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
