import { VehicleCard } from '@/components';
import { pickup, cargoVan, boxTruck } from '@/public/images';
import styles from './styles.module.scss';

const vehicles = [
  {
    name: 'Pickup',
    image: pickup,
    description: 'Single items deliveries, small items and loads.',
    price: '$32 + $1.52 per moving min',
    tooltip: 'Base fee of $32 + $1.52 per labor minute for loading/unloading.',
  },
  {
    name: 'Medium size van',
    image: cargoVan,
    description: 'Small moves and deliveries of multi items.',
    price: '$62 + $1.85 per moving min',
    tooltip: 'Base fee of $62 + $1.85 per labor minute for loading/unloading.',
  },
  {
    name: 'Large',
    image: boxTruck,
    description: 'Large moves, purchases, and deliveries.',
    price: '$101 + $2.05 per moving min',
    tooltip: 'Base fee of $101 + $2.05 per labor minute for loading/unloading.',
  },
];

const ServiceVehiclesStep = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h2>Find Your Ideal Ride</h2>
        <span>What suits your needs?</span>
      </section>

      <div className={styles.vehicles}>
        {vehicles.map((vehicle, i) => (
          <VehicleCard vehicle={vehicle} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ServiceVehiclesStep;
