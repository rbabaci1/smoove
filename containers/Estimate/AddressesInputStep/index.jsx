import { AddressesInput } from '@/components';
import styles from './styles.module.scss';

const AddressesInputStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Pickup & dropOff addresses</h2>

        <section className={styles.addresses}>
          <AddressesInput />
        </section>
      </div>
    </div>
  );
};

export default AddressesInputStep;
