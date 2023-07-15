import styles from './styles.module.scss';

const MyMove = ({ selectedMove }) => {
  console.log('selectedMove', selectedMove);

  return <div className={styles.container}>MyMove</div>;
};

export default MyMove;
