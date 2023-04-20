import Head from 'next/head';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { EstimateNavbar } from '@/components';
import {
  AddressesInputStep,
  ServicesStep,
  ServiceVehiclesStep,
  ConfirmServiceVehicleStep,
  ServiceDetailsStep,
  FinalStep,
} from '@/containers/Estimate';
import { Footer } from '@/containers';

const Estimate = () => {
  const { estimateStep } = useSelector(state => state.order);

  const renderStepContainer = () => {
    switch (estimateStep) {
      case 1:
        return <AddressesInputStep />;
      case 2:
        return <ServicesStep />;
      case 3:
        return <ServiceVehiclesStep />;
      case 4:
        return <ConfirmServiceVehicleStep />;
      case 5:
        return <ServiceDetailsStep />;
      case 6:
        return <FinalStep />;
      default:
        return <AddressesInputStep />;
    }
  };

  // const handleNext = () => {
  //   dispatch(goToNextEstimateStep());
  // };

  return (
    <>
      <Head>
        <title>Smoove free estimate</title>
        <meta
          name='description'
          content='Get a Free Moving Estimate with Smoove! Enter your move details, including move description, date, time, and contact info, after entering your addresses. Finish your online booking hassle-free with Smoove, your reliable and professional moving partner.'
        />
      </Head>

      <div className={styles.main}>
        <EstimateNavbar />

        <div className={styles.stepContainer}>{renderStepContainer()}</div>

        <Footer />
      </div>
    </>
  );
};

export default Estimate;
