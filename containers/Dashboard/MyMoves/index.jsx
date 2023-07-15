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
          userOrders.map((order, index) => (
            <MoveCard key={order.id} order={order} index={index + 1} />
          ))
        ) : (
          <p>No moves to display. Book your next move!</p>
        )}
      </div>
    </div>
  );
};

export default MyMoves;
