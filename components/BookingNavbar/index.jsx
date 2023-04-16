import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';

import styles from './styles.module.scss';
import {
  goToNextBookingStep,
  goToPreviousBookingStep,
} from '@/reduxSlices/orderSlice';

const BookingNavbar = () => {
  const { bookingStep } = useSelector(state => state.order);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BsArrowLeft />
      </div>
    </div>
  );
};

export default BookingNavbar;
