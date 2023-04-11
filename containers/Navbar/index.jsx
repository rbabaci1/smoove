import React, { useState } from 'react';
import Link from 'next/link';
import { LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  updateServiceType,
  setProceedToOptions,
} from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';
import { Dropdown } from '@/components';

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const handleServiceType = serviceType => {
    dispatch(updateServiceType(serviceType));
    dispatch(setProceedToOptions(true));
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href='#home' className={styles.logo}>
          <h2>Smoove</h2>
          <span>SF Bay area moving & delivery</span>
        </Link>

        <div className={styles.burgerMenu}>
          <MenuOutlined />
        </div>

        <div className={styles.navLinks}>
          <Dropdown />

          <Link href='/partners'>Partners</Link>

          <Link href='/login'>
            <LoginOutlined style={{ marginRight: 7 }} />
            Sign in
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
