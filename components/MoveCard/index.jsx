import MapContainer from '../Map';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

import styles from './styles.module.scss';

const MoveCard = ({ order }) => {
  console.log({ order });

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {/* <MapContainer addresses={order.addresses} height='300px' /> */}
      </div>

      <div className={styles.details}>
        <h3>{order.movingDate}</h3>
        <p>Arrival between {order.movingTime}</p>
        <h4>Vehicle type: {order.vehicleType}</h4>

        <div className={styles.addresses}>
          <section className={styles.address}></section>

          <section className={styles.address}></section>
        </div>
      </div>
    </div>
  );
};

export default MoveCard;
