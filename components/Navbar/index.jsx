import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Dropdown } from '@/components';
import { logo } from '@/public/images';
import styles from './styles.module.scss';

function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          {/* <h2>Smoove</h2> */}
          <Image src={logo} alt='company logo' priority />
          <span>SF Bay area moving & delivery</span>
        </Link>

        <div className={styles.burgerMenu}>
          <AiOutlineMenu />
        </div>

        <div className={styles.navLinks}>
          <Dropdown />

          {/* Add later when partner page is built */}
          {/* <Link href='/partner'>Partners</Link> */}

          <Link href='/login' className={styles.loginLink}>
            Sign in
            <HiOutlineUser />
          </Link>

          <motion.button
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            type='text'
            onClick={() => router.push('/estimate')}
          >
            Book now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
