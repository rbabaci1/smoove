import { VehicleCard } from '@/components';
import { pickup } from '@/public/images';
import styles from './styles.module.scss';

const vehicles = [
  {
    name: 'Pickup ',
    image: pickup,
    description: 'Delivery and transport for single, small items and loads.',
    price: '$22 + $0.80 per moving min',
    tooltip: 'Base fee of $22 + $0.80 per labor minute for loading/unloading.',
    isOneMover: true,
  },
  {
    name: 'Pickup',
    image: pickup,
    description: 'Delivery and transport for single, small items and loads.',
    price: '$32 + $1.52 per moving min',
    tooltip: 'Base fee of $32 + $1.52 per labor minute for loading/unloading.',
  },
  {
    name: 'Medium size van',
    image: pickup,
    description: 'Small moves and deliveries of multi items.',
    price: '$62 + $1.85 per moving min',
    tooltip: 'Base fee of $62 + $1.85 per labor minute for loading/unloading.',
  },
  {
    name: 'Large',
    image: pickup,
    description: 'Large moves, purchases, and deliveries.',
    price: '$101 + $2.05 per moving min',
    tooltip: 'Base fee of $101 + $2.05 per labor minute for loading/unloading.',
  },
];

const ServiceVehiclesStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.vehicles}>
        {vehicles.map((vehicle, i) => (
          <VehicleCard vehicle={vehicle} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ServiceVehiclesStep;
