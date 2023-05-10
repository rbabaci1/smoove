import { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

import {
  Landing,
  HowItWorks,
  GetAnEstimate,
  CustomersReviews,
  Careers,
  FrequentlyAskedQuestions,
  Footer,
} from '@/containers';
import { Navbar } from '@/components';
import { goToSpecificEstimateStep } from '@/state/reduxSlices/orderSlice';
import { auth } from '@/firebase/firebase.config';

import styles from '@/styles/Home.module.scss';
import { setUser } from '@/state/reduxSlices/authSlice';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(goToSpecificEstimateStep(1));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user', user);
        // const {
        //   uid,
        //   accessToken,
        //   displayName,
        //   email,
        //   emailVerified,
        //   tenantId,
        //   phoneNumber,
        // } = user;

        // dispatch(
        //   setUser({
        //     uid,
        //     accessToken,
        //     displayName,
        //     email,
        //     emailVerified,
        //     tenantId,
        //     phoneNumber,
        //   })
        // );
      } else {
        console.log('no user');
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Smoove</title>
        <meta
          name='description'
          content='Smoove is a Bay Area moving company that offers fully online services. Customers can easily book and track their moves online, eliminating the hassle of phone calls and paperwork. With professional movers and real-time tracking, Smoove provides a smooth and efficient moving experience.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Landing />
        <Navbar />
        <HowItWorks />
        <GetAnEstimate />
        <CustomersReviews />
        <Careers />
        <FrequentlyAskedQuestions />
        <Footer />
      </main>
    </>
  );
}
