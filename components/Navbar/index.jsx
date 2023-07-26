import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Drawer, Divider } from 'antd';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';

import { Dropdown } from '@/components';
import { logo } from '@/public/images';
import styles from './styles.module.scss';

function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          <Image src={logo} alt='company logo' priority />
          <span>SF Bay area moving & delivery</span>
        </Link>

        <div className={styles.burgerMenu}>
          {open ? (
            <motion.section
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AiOutlineClose onClick={onClose} />
            </motion.section>
          ) : (
            <AiOutlineMenu onClick={showDrawer} />
          )}

          <Drawer
            placement='left'
            title={
              <>
                <Image
                  style={{ transform: 'scale(0.5)', position: 'absolute' }}
                  src={logo}
                  alt='company logo'
                  priority
                />

                <AiOutlineClose onClick={onClose} />
              </>
            }
            onClose={onClose}
            closable={false}
            mask={false}
            open={open}
            // width='80%'
          >
            <Dropdown mobile />

            <Divider style={{ margin: 0 }} />

            <Link href='/login' className={styles.loginLink}>
              Sign in
              <HiOutlineUser />
            </Link>

            <Divider style={{ margin: 0 }} />

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
