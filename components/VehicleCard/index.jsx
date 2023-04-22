import Image from 'next/image';

import styles from './styles.module.scss';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h3>{vehicle.name}</h3>
        {vehicle?.isOneMover && <span>{'1 Mover'}</span>}
      </section>

      <Image src={vehicle.image} alt={vehicle.name} />

      <p>{vehicle.description}</p>

      <h4>{vehicle.price}</h4>
    </div>
  );
};

export default VehicleCard;
