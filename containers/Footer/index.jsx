import { useState } from 'react';
import Link from 'next/link';
import { BsGooglePlay } from 'react-icons/bs';
import { FaAppStoreIos } from 'react-icons/fa';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

const initialState = {
  email: '',
  clientSignedUp: false,
};

function Footer({ bgColor = '#f7faff' }) {
  const [signupInfo, setSignUpInfo] = useState(initialState);

  const handleChange = event => {
    const { name, value } = event.target;

    setSignUpInfo({ ...signupInfo, [name]: value });
  };

  const handleSignUp = event => {
    event.preventDefault();
    setSignUpInfo({ email: '', clientSignedUp: true });

    setTimeout(() => {
      setSignUpInfo(initialState);
    }, 2000);
  };

  return (
    <div className={styles.footerWrapper} style={{ backgroundColor: bgColor }}>
      <div className={styles.container}>
        <div className={styles.subscribe}>
          <p>Sign up for emails and announcements, news, deals and more! </p>

          <form className={styles.email} onSubmit={handleSignUp}>
            <input
              type='email'
              name='email'
              placeholder='Email address'
              value={signupInfo.email}
              onChange={handleChange}
              required
            />

            <motion.button
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              type='submit'
            >
              {signupInfo.clientSignedUp ? 'Thanks!' : 'Subscribe'}
            </motion.button>
          </form>
        </div>

        <div className={styles.learnMore}>
          <div className={styles.item}>
            <h3>Smoove</h3>
            <ul>
              <li>
                <Link href='/book/location'>Get an estimate</Link>
              </li>

              <li>
                <Link href='/become_a_mover'>Become a mover</Link>
              </li>
            </ul>
          </div>

          <div className={styles.item}>
            <h3>Support</h3>
            <ul>
              <li>
                <Link href='/help'>Help center</Link>
              </li>
              <li>
                <Link href='/contact'>Contact us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.appsContainer}>
            <p>Soon our mobile apps will be available!</p>

            <div className={styles.apps}>
              <div className={styles.app}>
                <FaAppStoreIos color='#007AFF ' className={styles.apple} />
                <span>Coming soon...</span>
              </div>

              <div>
                <div className={styles.app}>
                  <BsGooglePlay color='#4CAF50' className={styles.android} />
                  <span>Coming soon...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
