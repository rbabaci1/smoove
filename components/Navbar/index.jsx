import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import { Dropdown } from '@/components';

function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
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

          <motion.button
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            type='text'
            onClick={() => router.push('/book/location')}
          >
            Book now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
