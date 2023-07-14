import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { WithAuth } from '@/components';
import { getUserOrders } from '@/lib';
import { MyOrders, MyAccount } from '@/containers/Dashboard';
import styles from './styles.module.scss';

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [userOrders, setUserOrders] = useState([]);
  const [activeContainer, setActiveContainer] = useState(1);

  useEffect(() => {
    // Scroll to top of the page when user changes step
    window.scrollTo(0, 0);

    async function fetchOrders() {
      try {
        const userOrders = await getUserOrders(user.uid);

        setUserOrders(userOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    }

    fetchOrders();
  }, [user.uid]);

  const dashboardComponents = {
    1: <MyOrders userOrders={userOrders} />,
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
    <div className={styles.dashboardWrapper}>
      <div className={styles.navBarWrapper}>
        <nav>
          <span
            onClick={() => setActiveContainer(0)}
            className={activeContainer === 0 ? styles.activeItem : null}
          >
            Home
          </span>

          <span
            onClick={() => setActiveContainer(1)}
            className={activeContainer === 1 ? styles.activeItem : null}
          >
            My Moves
          </span>

          <span
            onClick={() => setActiveContainer(2)}
            className={activeContainer === 2 ? styles.activeItem : null}
          >
            My Account
          </span>

          <span
            onClick={() => setActiveContainer(3)}
            className={activeContainer === 3 ? styles.activeItem : null}
          >
            Log Out
          </span>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.dashboardContainer}>
          {renderDashboardContainer()}
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
