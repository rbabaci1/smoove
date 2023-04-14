import { Carousel, AddressesInput } from '@/components';
import styles from './styles.module.scss';

const Landing = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <AddressesInput />
    </div>
  );
};

export default Landing;
