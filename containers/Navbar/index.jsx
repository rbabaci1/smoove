import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { Dropdown } from '@/components';

function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='#home' className={styles.logo}>
          <h2>Smoove</h2>
          <span>SF Bay area moving & delivery</span>
        </Link>

        <div className={styles.burgerMenu}>
          <AiOutlineMenu />
        </div>

        <div className={styles.navLinks}>
          <Dropdown />

          <Link href='/partner'>Partners</Link>

          <Link href='/login' className={styles.loginLink}>
            Sign in
            <HiOutlineUser />
          </Link>

          <button type='text' onClick={() => router.push('/book/location')}>
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
