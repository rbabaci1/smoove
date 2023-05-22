import styles from './styles.module.scss';

const PaymentMethodStep = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <section className={styles.cardNumber}>
          <h3>Phone number</h3>
        </section>
      </form>
    </div>
  );
};

export default PaymentMethodStep;
