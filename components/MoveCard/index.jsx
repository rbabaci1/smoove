import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';
import { motion } from 'framer-motion';

import MapContainer from '../Map';
import styles from './styles.module.scss';

const statusColors = {
  draft: '#f0f0f0',
  confirmed: '#00ff00',
  ongoing: '#ffa500',
  completed: '#008000',
  canceled: '#ffcccc',
  pending: '#cccccc',
};

const MoveCard = ({ order, index, selectMove }) => {
  const { addresses, movingDate, movingWindow, vehicleType, status } = order;

  const pickupAddress = addresses.pickup.place_name.split(',');
  const dropOffAddress = addresses.dropOff.place_name.split(',');

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: index * 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      onClick={() => selectMove(order)}
    >
      <div
        className={styles.status}
        style={{ backgroundColor: statusColors[status] }}
      >
        Status: {status}
      </div>

      <div className={styles.map}>
        {/* <MapContainer
          orderId={order.id}
          addresses={addresses}
          height='240px'
          radius='0.75rem 0 0 0.75rem'
        /> */}
      </div>

      <div className={styles.details}>
        <h3>{movingDate}</h3>
        <p>Arrival between {movingWindow}</p>
        <h4>
          Vehicle type: <span>{vehicleType}</span>
        </h4>

        <div className={styles.addresses}>
          <div className={styles.address}>
            <BsFillArrowUpCircleFill color='green' />

            <section>
              <span>Pickup address:</span>
              <p>
                {pickupAddress[0]}, {pickupAddress[1]}
              </p>
            </section>
          </div>

          <div className={styles.address}>
            <BsFillArrowDownCircleFill color='red' />

            <section>
              <span>Drop-off address:</span>
              <p>
                {dropOffAddress[0]}, {dropOffAddress[1]}
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoveCard;
