import { useDispatch } from 'react-redux';

import { goToNextEstimateStep } from '@/reduxSlices/orderSlice';
import { VehicleCard } from '@/components';
import { service1 } from '@/public/images';
import styles from './styles.module.scss';

const vehicles = [
  {
    name: 'Pickup ',
    image: service1,
    description: 'A small car with room for 4 passengers and 2 large bags.',
    price: '$40 + $0.80 per moving min',
    isOneMover: true,
  },
  {
    name: 'Pickup',
    image: service1,
    description: 'A small car with room for 4 passengers and 2 large bags.',
    price: '$40 + $1.52 per moving min',
  },
  {
    name: 'Medium size van',
    image: service1,
    description: 'A small car with room for 4 passengers and 2 large bags.',
    price: '$62 + $1.85 per moving min',
  },
  {
    name: 'High roof van',
    image: service1,
    description: 'A small car with room for 4 passengers and 2 large bags.',
    price: '$101 + $2.05 per moving min',
  },
];

const ServiceVehiclesStep = () => {
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(goToNextEstimateStep());
  };

  return (
    <div className={styles.container}>
      <div className={styles.vehicles}>
        {vehicles.map((vehicle, i) => (
          <VehicleCard vehicle={vehicle} key={i} />
        ))}
      </div>

      <button onClick={handleNextStep}>Continue</button>
    </div>
  );
};

export default ServiceVehiclesStep;
