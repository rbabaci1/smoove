import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

const FinalStep = () => {
  const order = useSelector(state => state.order);

  console.log(order);

  return <div className={styles.container}>FinalStep</div>;
};

export default FinalStep;
