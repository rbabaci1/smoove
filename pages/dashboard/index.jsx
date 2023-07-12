import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { Sidebar, WithAuth } from '@/components';
import { MyMoves, MyAccount } from '@/containers/Dashboard';
import styles from './styles.module.scss';

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeContainer, setActiveContainer] = useState(1);

  useEffect(() => {
    // Scroll to top of the page when user changes step
    window.scrollTo(0, 0);
  }, []);

  const dashboardComponents = {
    1: <MyMoves />,
    2: <MyAccount />,
  };

  const renderDashboardContainer = () => {
    return (
      <motion.div key={activeContainer} transition={transition}>
        {dashboardComponents[activeContainer]}
      </motion.div>
    );
  };

  return (
    <div className={styles.main}>
      <Sidebar
        activeContainer={activeContainer}
        setActiveContainer={setActiveContainer}
      />

      <div className={styles.dashboardContainer}>
        {renderDashboardContainer()}
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
