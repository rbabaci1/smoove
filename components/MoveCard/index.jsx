import MapContainer from '../Map';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

import styles from './styles.module.scss';

const MoveCard = ({ order }) => {
  console.log({ order });
  const pickupAddress = order.addresses.pickup.place_name.split(',');
  const dropOffAddress = order.addresses.dropOff.place_name.split(',');

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {/* <MapContainer addresses={order.addresses} height='300px' /> */}
      </div>

      <div className={styles.details}>
        <h3>{order.movingDate}</h3>
        <p>Arrival between {order.movingWindow}</p>
        <h4>
          Vehicle type: <span>{order.vehicleType}</span>
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
    </div>
  );
};

export default MoveCard;
