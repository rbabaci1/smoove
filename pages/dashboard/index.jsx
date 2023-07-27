import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import { DashboardNavbar, WithAuth } from '@/components';
import { MyMove, MyMoves, MyAccount } from '@/containers/Dashboard';
import { getUserOrders } from '@/lib';
import styles from './styles.module.scss';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useSelector(state => state.auth);

  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [cancelingMove, setCancelingMove] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [activeContainer, setActiveContainer] = useState(1);
  const [selectedMove, setSelectedMove] = useState(null);

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

  const cancelMove = async () => {
    try {
      setCancelingMove(true);

      // !!! update order status to canceled
    } catch (error) {
      console.error('Error canceling move:', error);
      toast.error('Error canceling move');
    } finally {
      setCancelingMove(false);
    }
  };

  const dashboardComponents = {
    1: (
      <MyMoves
        userOrders={userOrders}
        fetchingOrders={fetchingOrders}
        setActiveContainer={setActiveContainer}
        setSelectedMove={setSelectedMove}
      />
    ),
    2: <MyAccount />,
    3: <MyMove selectedMove={selectedMove} cancelMove={cancelMove} />,
  };

  return (
    <div className={styles.dashboardWrapper}>
      {cancelingMove ? (
        <div className={styles.loadingContainer}>
          <AiOutlineLoading3Quarters color='red' className='loading' />
        </div>
      ) : null}

      <DashboardNavbar
        activeContainer={activeContainer}
        setActiveContainer={setActiveContainer}
      />

      <div className={styles.main}>
        {activeContainer === 1 ? (
          <button onClick={() => router.push('/estimate')}>Book a move</button>
        ) : null}

        {dashboardComponents[activeContainer]}
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
