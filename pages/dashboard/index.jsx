import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import { DashboardNavbar, WithAuth } from '@/components';
import { MyMove, MyMoves, MyAccount } from '@/containers/Dashboard';
import { getUserOrders, updateOrderStatus, getUserPaymentMethods } from '@/lib';
import styles from './styles.module.scss';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useSelector(state => state.auth);

  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [cancelingMove, setCancelingMove] = useState(false);
  const [activeContainer, setActiveContainer] = useState(1);
  const [selectedMove, setSelectedMove] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const paymentMethods = await getUserPaymentMethods(user.uid);

        setPaymentMethods(paymentMethods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error(error.message);
      }
    };

    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const cancelMove = async () => {
    if (confirm('Are you sure you want to cancel this move?')) {
      try {
        setCancelingMove(true);

        await updateOrderStatus(user.uid, selectedMove.id, 'canceled');

        toast.success('Move canceled!');

        // Update the userOrders state with the new status for the canceled order
        const updatedUserOrders = userOrders.map(order => {
          if (order.id === selectedMove.id) {
            return {
              ...order,
              status: 'canceled',
            };
          }
          return order;
        });

        // Update the userOrders state with the updated order list
        setUserOrders(updatedUserOrders);

        setTimeout(() => {
          setActiveContainer(1);
        }, 1500);
      } catch (error) {
        console.error('Error canceling move:', error);
        toast.error('Error canceling move');
      } finally {
        setCancelingMove(false);
      }
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
    2: (
      <MyAccount
        paymentMethods={paymentMethods}
        setPaymentMethods={setPaymentMethods}
      />
    ),
    3: <MyMove selectedMove={selectedMove} cancelMove={cancelMove} />,
  };

  return (
    <div className={styles.dashboardWrapper}>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme='colored'
        pauseOnHover={false}
      />

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
