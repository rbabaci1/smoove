import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Drawer } from 'antd';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { BiLogOutCircle } from 'react-icons/bi';

import { logo } from '@/public/images';
import { auth } from '@/firebase/firebase.config';
import styles from './styles.module.scss';

function Navbar() {
  const router = useRouter();
  const { user } = useSelector(state => state.auth);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.replace('/');
      auth.signOut();
    }
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          <Image src={logo} alt='company logo' priority />
          <span>SF Bay area moving & delivery</span>
        </Link>

        <div className={styles.burgerMenu}>
          {open ? null : <AiOutlineMenu onClick={showDrawer} />}

          <Drawer
            placement='left'
            onClose={onClose}
            closable={false}
            mask={false}
            open={open}
            width={'100%'}
          >
            <section
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e8e8e8',
                paddingBottom: '1.5rem',
              }}
            >
              {user ? (
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                    cursor: 'pointer',
                  }}
                  onClick={handleLogOut}
                >
                  Log out
                  <BiLogOutCircle style={{ marginLeft: '0.2rem' }} />
                </p>
              ) : (
                <Link
                  href='/'
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  Sign in
                  <HiOutlineUser style={{ marginLeft: '0.2rem' }} />
                </Link>
              )}

              <AiOutlineClose
                style={{
                  fontSize: '2rem',
                  color: '#410eff',
                  cursor: 'pointer',
                }}
                onClick={onClose}
              />
            </section>

            <motion.button
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              type='text'
              onClick={() => router.push('/estimate')}
            >
              Book now
            </motion.button>
          </Drawer>
        </div>

        <div className={styles.navLinks}>
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
