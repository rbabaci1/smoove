import { Carousel, AddressesInput } from '@/components';
import styles from './Styles.module.scss';

const Landing = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <AddressesInput />
    </div>
  );
};

export default Landing;
