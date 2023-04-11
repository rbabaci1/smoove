import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { Dropdown } from '@/components';

function Navbar() {
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Hide Navbar when scrolling down and user has scrolled past 10vh
      if (
        prevScrollPos > currentScrollPos &&
        currentScrollPos > window.innerHeight * 1.1
      ) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`${styles.navWrapper} ${isNavbarVisible ? '' : styles.hidden}`}
    >
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

          <Link href='/partners'>Partners</Link>

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
