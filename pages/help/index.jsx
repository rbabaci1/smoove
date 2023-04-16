import { useState } from 'react';
import Head from 'next/head';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';

import {
  Footer,
  FrequentlyAskedQuestions,
  GetAnEstimate,
  Reviews,
} from '@/containers';
import { Navbar } from '@/components';
import { help } from '@/public/images';
import styles from './styles.module.scss';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Smoove | Help Center</title>
        <meta
          name='description'
          content={`Smoove's Help Center is a comprehensive resource for their customers, offering prompt assistance and solutions to their inquiries. With a user-friendly interface, customers can easily search for answers to their questions and access helpful information provided by Smoove's knowledgeable customer service team. From frequently asked questions to step-by-step guides, the Help Center is designed to ensure a seamless experience, providing reliable support and guidance to enhance the overall customer satisfaction. Discover the wealth of assistance available at Smoove's Help Center to address your concerns and make your moving process as smooth as possible.`}
        />
      </Head>

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <div className={styles.input}>
            <h1>How can we help?</h1>

            <section className={styles.searchInput}>
              <CiSearch />
              <input
                type='text'
                value={searchTerm}
                onChange={handleChange}
                placeholder='Search for your question'
              />
            </section>
          </div>

          <Image
            className={styles.helpImg}
            src={help}
            alt='customer getting help via internet'
          />
        </div>

        <FrequentlyAskedQuestions />

        <Reviews />

        <GetAnEstimate bgColor='#fff' />

        <Footer />
      </div>
    </>
  );
};

export default Help;
