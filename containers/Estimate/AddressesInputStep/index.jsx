import { AddressesInput } from '@/components';
import styles from './styles.module.scss';

const AddressesInputStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.header}>
          <h2>Pickup & Drop-off addresses</h2>
          <span>{`And we'll get you moving!`}</span>
        </section>

        <section className={styles.addresses}>
          <AddressesInput buttonText='Continue' />
        </section>
      </div>
    </div>
  );
};

export default AddressesInputStep;
