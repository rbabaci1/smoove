import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { OrderCard } from '@/components';
import styles from './styles.module.scss';

const MyMoves = ({ userOrders }) => {
  console.log({ userOrders });
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h3>My moves</h3>
    </div>
  );
};

export default MyMoves;
