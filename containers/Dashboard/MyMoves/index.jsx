import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { OrderCard } from '@/components';
import styles from './styles.module.scss';

const MyMoves = ({ userOrders }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        {userOrders.length > 0 ? (
          userOrders.map(order => <OrderCard key={order.id} order={order} />)
        ) : (
          <p>No moves at the moment</p>
        )}
      </div>
    </div>
  );
};

export default MyMoves;
