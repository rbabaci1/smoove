import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

import { auth } from '@/firebase/firebase.config';
import { ErrorMessage } from '@/components';
import styles from './styles.module.scss';
import { setUser } from '@/reduxSlices/authSlice';

// temporary verification code length
const verificationCodeLength = 6;

const Login = ({ animate = true }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  // redirect to dashboard if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.replace('/dashboard');
      }
    });

    return unsubscribe;
  }, [router]);

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

  const generateRecaptcha = () => {
    const loginContainer = document.getElementById('login-container');
    const reCaptchaContainer = document.createElement('div');
    reCaptchaContainer.id = 'recaptcha-container';

    // append recaptcha container to login container
    if (loginContainer) loginContainer.appendChild(reCaptchaContainer);

    window.recaptchaVerifier = new RecaptchaVerifier(
      reCaptchaContainer,
      {
        size: 'invisible',
        'expired-callback': () => {
          // reCaptcha expired, reset the recaptchaVerifier and call it again
          window.reCaptchaContainer.remove();
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

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier,
        { timeout: 300000 }
      );

      window.confirmationResult = confirmationResult;
      setVerificationCodeSent(true);
      setPhoneNumberErrors('');
    } catch (error) {
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });

      setPhoneNumberErrors('Something went wrong. Please try again.');
      console.log(error.message);
    } finally {
      setSendingVerificationCode(false);
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
          const res = await window.confirmationResult.confirm(verificationCode);
          const {
            uid,
            accessToken,
            displayName,
            email,
            emailVerified,
            tenantId,
            phoneNumber,
          } = res.user;

          setVerifyingCode(false);
          dispatch(
            setUser({
              uid,
              accessToken,
              displayName,
              email,
              emailVerified,
              tenantId,
              phoneNumber,
            })
          );

          router.replace('/dashboard');
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
    setPreviousVerificationCode('');
  };

  const handleSignIn = e => {
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
      <form onSubmit={handleSignIn}>
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

                {verifyingCode ? (
                  <AiOutlineLoading3Quarters className='loading' />
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
                  <AiOutlineLoading3Quarters className='loading' />
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
