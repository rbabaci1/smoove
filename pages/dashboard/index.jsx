import { Sidebar, WithAuth } from '@/components';
import styles from './styles.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardWrapper}>
      <Sidebar />

      <div className={styles.dashboardContent}>
        <h2>Welcome to Dashboard</h2>
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
