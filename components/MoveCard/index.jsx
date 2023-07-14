import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

import MapContainer from '../Map';
import styles from './styles.module.scss';

const MoveCard = ({ order }) => {
  const { addresses, movingDate, movingWindow, vehicleType, status } = order;

  const pickupAddress = addresses.pickup.place_name.split(',');
  const dropOffAddress = addresses.dropOff.place_name.split(',');

  console.log({ status });

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {/* <MapContainer
          addresses={addresses}
          height='260px'
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
    </div>
  );
};

export default MoveCard;
