import Link from 'next/link';
import { BsApple, BsAndroid2 } from 'react-icons/bs';

import styles from './styles.module.scss';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.container}>
        <div className={styles.subscribe}>
          <p>Sign up for emails and announcements, news, deals and more! </p>

          <div className={styles.email}>
            <input type='email' name='email' placeholder='Email address...' />

            <button type='email' onClick={() => console.log('SUBSCRIBE')}>
              Subscribe
            </button>
          </div>
        </div>

        {/* // !! redo */}
        <div className={styles.learnMore}>
          <div className={styles.item}>
            <h3>Smoove</h3>
            <ul>
              <li>
                <Link href='/book/location'>Get an estimate</Link>
              </li>

              <li>
                <Link href='/become_a_mover'>Join us</Link>
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
            <p>Move anything on your schedule!</p>

            <div className={styles.apps}>
              <div className={styles.app}>
                <BsApple className={styles.apple} />
                <span>Coming soon</span>
              </div>

              <div>
                <div className={styles.app}>
                  <BsAndroid2 className={styles.android} />
                  <span>Coming soon</span>
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
