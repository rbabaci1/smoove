import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { IoNavigateOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

import {
  updateServiceType,
  goToNextEstimateStep,
} from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const ServiceType = ({
  service,
  img,
  uniqueStyles,
  initialAnimationDistance,
}) => {
  const dispatch = useDispatch();
  const { serviceType } = useSelector(state => state.order);

  const goToNextStep = () => {
    dispatch(updateServiceType(service));
    dispatch(goToNextEstimateStep());
  };

  return (
    <div
      className={`${styles.container} ${
        serviceType === service ? styles.serviceSelected : ''
      }`}
      onClick={goToNextStep}
    >
      <section className={styles.img}>
        <Image
          src={img}
          alt='service icon'
          style={uniqueStyles ? { ...uniqueStyles } : {}}
        />
      </section>

      <section className={styles.title}>
        <h4>{service}</h4>
        <IoNavigateOutline />
      </section>
    </div>
  );
};

export default ServiceType;
