import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoNavigateOutline } from 'react-icons/io5';

import { updateServiceType } from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const ServiceType = ({ service, img, uniqueStyles }) => {
  const dispatch = useDispatch();
  const { serviceType } = useSelector(state => state.order);

  const goToNextStep = () => {
    dispatch(updateServiceType(service));
  };

  return (
    <motion.div
      className={`${styles.container} ${
        serviceType === service ? styles.serviceSelected : ''
      }`}
      onClick={goToNextStep}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
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
    </motion.div>
  );
};

export default ServiceType;
