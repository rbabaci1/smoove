import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { MoveCard } from '@/components';
import styles from './styles.module.scss';

const MyMoves = ({ userOrders, fetchingOrders }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        {fetchingOrders ? (
          <AiOutlineLoading3Quarters className={`${styles.loading} loading`} />
        ) : userOrders.length > 0 ? (
          userOrders.map(order => <MoveCard key={order.id} order={order} />)
        ) : (
          <p>No moves at the moment</p>
        )}
      </div>
    </div>
  );
};

export default MyMoves;
