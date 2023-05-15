import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';

import {
  selectVehicleType,
  setMovingPrice,
  goToNextEstimateStep,
} from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const VehicleCard = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { vehicleType } = useSelector(state => state.order);

  const handleVehicleTypeAndPricing = () => {
    dispatch(selectVehicleType(vehicle.name));
    dispatch(setMovingPrice(vehicle.price));
    dispatch(goToNextEstimateStep());
  };

  return (
    <motion.div
      className={styles.container}
      onClick={handleVehicleTypeAndPricing}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
    >
      <section className={styles.img}>
        <Image src={vehicle.image} alt={vehicle.name} />
      </section>

      <section className={styles.info}>
        <div className={styles.title}>
          <h3>{vehicle.name}</h3>
        </div>

        <p>{vehicle.description}</p>

        <h4>
          {vehicle.price}
          <Tooltip title={vehicle.tooltip}>
            <span>i</span>
          </Tooltip>
        </h4>
      </section>
    </motion.div>
  );
};

export default VehicleCard;
