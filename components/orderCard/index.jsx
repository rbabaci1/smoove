import { MapContainer } from '..';

import styles from './styles.module.scss';

const OrderCard = ({ order }) => {
  console.log({ order });

  return (
    <div className={styles.container}>
      <section className={styles.map}>
        <MapContainer addresses={order.addresses} height='300px' />
      </section>

      <section className={styles.details}>Details</section>
    </div>
  );
};

export default OrderCard;
