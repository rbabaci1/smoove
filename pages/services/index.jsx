import { useRouter } from 'next/router';

import styles from './styles.module.scss';

const Services = () => {
  const router = useRouter();
  const { query } = router;

  console.log(query);

  return <div className={styles.main}>Services</div>;
};

export default Services;
