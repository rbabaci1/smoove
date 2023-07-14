import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { OrderCard } from '@/components';
import styles from './styles.module.scss';

const MyOrders = ({ userOrders }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        {userOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
