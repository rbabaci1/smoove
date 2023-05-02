import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
import {
  goToSpecificEstimateStep,
  setUserLocation,
} from '@/reduxSlices/orderSlice';
import { getUserLocation } from '@/lib';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAndSetUserLocation = async () => {
      const location = await getUserLocation();
      dispatch(setUserLocation(location));
    };
    const handleHomePageLoad = () => {
      dispatch(goToSpecificEstimateStep(1));
    };

    getAndSetUserLocation();
    handleHomePageLoad();
  }, [dispatch, router.pathname]);

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
