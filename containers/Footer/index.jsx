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
              <Link href='/book/location'>
                <li>Get an estimate</li>
              </Link>
              <Link href='/become_a_mover'>
                <li>Join our team</li>
              </Link>
            </ul>
          </div>

          <div className={styles.item}>
            <h3>Support</h3>
            <ul>
              <Link href='/help'>
                <li>Help center</li>
              </Link>

              <Link href='/contact'>
                <li>Contact us</li>
              </Link>
            </ul>
          </div>

          <div className={styles.appsContainer}>
            <div className={styles.text}>
              Move anything on your schedule! Download our app.
            </div>
            <div className={styles.apps}>
              <div className={styles.app}>
                <BsApple className={styles.apple} />
                <span>GET IT ON APPLE</span>
              </div>

              <div>
                <div className={styles.app}>
                  <BsAndroid2 className={styles.android} />
                  <span>GET IT ON GOOGLE PLAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.legals}>Smoove&copy;2023</div>
      </div>
    </div>
  );
}

export default Footer;
