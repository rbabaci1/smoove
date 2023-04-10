import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DownOutlined,
  ShopTwoTone,
  LoginOutlined,
  DeleteTwoTone,
  HeartTwoTone,
  HomeTwoTone,
  MenuOutlined,
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  updateServiceType,
  setProceedToOptions,
} from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';
import { logo } from '/public/images';

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const handleServiceType = serviceType => {
    dispatch(updateServiceType(serviceType));
    dispatch(setProceedToOptions(true));
  };

  const items = [
    {
      label: (
        <Link
          rel='noopener noreferrer'
          href='/book/location'
          onClick={() => {
            handleServiceType('Store delivery');
          }}
        >
          Store delivery
        </Link>
      ),
      key: '0',

      icon: (
        <ShopTwoTone
          style={{
            fontSize: 22,
            padding: '10px 0px',
          }}
        />
      ),
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          rel='noopener noreferrer'
          href='/book/location'
          onClick={() => {
            handleServiceType('Junk removal');
          }}
        >
          Junk removal
        </Link>
      ),
      key: '1',
      icon: <DeleteTwoTone style={{ fontSize: 22, padding: '10px 0px' }} />,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          rel='noopener noreferrer'
          href='/book/location'
          onClick={() => {
            handleServiceType('Donations');
          }}
        >
          Donations
        </Link>
      ),
      key: '2',
      icon: <HeartTwoTone style={{ fontSize: 22, padding: '10px 0px' }} />,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          rel='noopener noreferrer'
          href='/book/location'
          onClick={() => {
            handleServiceType('Regular move');
          }}
        >
          Regular move
        </Link>
      ),
      key: '3',
      icon: <HomeTwoTone style={{ fontSize: 22, padding: '10px 0px' }} />,
    },
  ];

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

        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.dropdown}>
              <Dropdown
                menu={{
                  items,
                }}
                overlayStyle={{ width: 220 }}
              >
                <Space
                  style={{
                    fontSize: 'clamp(0.9rem, 5vw, 1.1rem)',
                    fontWeight: 600,
                  }}
                >
                  Services
                  <DownOutlined className={styles.downArrow} />
                </Space>
              </Dropdown>
            </div>
          </div>

          <div className={styles.item}>
            <Link href='/partners'>Partners</Link>
          </div>

          <div className={styles.item}>
            <Link href='/login'>
              <LoginOutlined style={{ marginRight: 7 }} />
              Sign in
            </Link>
          </div>

          <div className={styles.item}>
            <button type='text' onClick={() => router.push('/book/location')}>
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
