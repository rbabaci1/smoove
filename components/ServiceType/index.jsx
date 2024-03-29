import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoNavigateOutline } from 'react-icons/io5';
import { Tooltip } from 'antd';

import {
  updateServiceType,
  goToNextEstimateStep,
} from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const ServiceType = ({ service, img, uniqueStyles, tooltip }) => {
  const dispatch = useDispatch();
  const { serviceType } = useSelector(state => state.order);

  const goToNextStep = () => {
    dispatch(updateServiceType(service));
    dispatch(goToNextEstimateStep());
  };

  return (
    <motion.div
      className={`${styles.container} ${
        serviceType === service ? styles.serviceSelected : ''
      }`}
      onClick={goToNextStep}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
    >
      <div className={styles.img}>
        <Image
          src={img}
          alt='service icon'
          style={uniqueStyles ? { ...uniqueStyles } : {}}
        />
      </div>

      <div className={styles.title}>
        <h4>{service}</h4>

        <section>
          <IoNavigateOutline />

          <Tooltip title={tooltip}>
            <span>i</span>
          </Tooltip>
        </section>
      </div>
    </motion.div>
  );
};

export default ServiceType;
