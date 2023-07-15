import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { DashboardNavbar, WithAuth } from '@/components';
import { getUserOrders } from '@/lib';
import { MyMoves, MyAccount } from '@/containers/Dashboard';
import styles from './styles.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);
  const [fetchingOrders, setFetchingOrders] = useState(true);
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
      } finally {
        setFetchingOrders(false);
      }
    }

    fetchOrders();
  }, [user.uid]);

  const dashboardComponents = {
    1: <MyMoves userOrders={userOrders} fetchingOrders={fetchingOrders} />,
    2: <MyAccount />,
  };

  const renderDashboardContainer = () => (
    <div>{dashboardComponents[activeContainer]}</div>
  );

  return (
    <div className={styles.dashboardWrapper}>
      <DashboardNavbar
        activeContainer={activeContainer}
        setActiveContainer={setActiveContainer}
      />

      <div className={styles.main}>
        <button onClick={() => router.push('/estimate')}>Book a move</button>

        {renderDashboardContainer()}
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
