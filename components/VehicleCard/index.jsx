import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';

import { selectVehicleType } from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const VehicleCard = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { vehicleType } = useSelector(state => state.order);

  const handleVehicleType = () => {
    dispatch(selectVehicleType(vehicle.name));
  };

  return (
    <motion.div
      className={`${styles.container} ${
        vehicleType === vehicle.name ? styles.vehicleSelected : ''
      }`}
      onClick={handleVehicleType}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
    >
      <section className={styles.img}>
        <Image src={vehicle.image} alt={vehicle.name} />
      </section>

      <section className={styles.info}>
        <div className={styles.title}>
          <h3>{vehicle.name}</h3>
          {vehicle?.isOneMover && <span>{'1 Mover'}</span>}
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
