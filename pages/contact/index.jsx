import Head from 'next/head';
import Link from 'next/link';

import { Footer } from '@/containers';
import { Navbar } from '@/components';
import styles from './styles.module.scss';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact | Smoove</title>
        <meta
          name='description'
          content={`Connect with Smoove - Your Trusted Moving Partner. Contact Smoove via email for all your inquiries - from customer support to business partnerships. Get in touch with our knowledgeable team for prompt assistance and solutions. Stores can also request free flyers to enhance their business. Job hunters can inquire about available positions. Contact Smoove today for a seamless experience and personalized support.`}
        />
      </Head>

      <Navbar />

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.contact}>
            <h1>Contact us</h1>

            <section className={styles.mainEmail}>
              <span>
                Reach out and inform us of how we can be of assistance
              </span>

              <Link href='mailto:support@smoove.com' target='_blank'>
                support@smoove.com
              </Link>
            </section>

            <section className={styles.storesEmail}>
              <h4>Retailers & Business Affiliates</h4>
              <Link href='mailto:affiliates@smoove.com' target='_blank'>
                affiliates@smoove.com
              </Link>
            </section>

            <Link href=''>
              Free promotional fliers for your store or business (coming soon)
            </Link>

            <section className={styles.jobs}>
              <h4>Join us!</h4>
              <Link href='mailto:jobs@smoove.com' target='_blank'>
                jobs@smoove.com
              </Link>
            </section>
          </div>

          <div className={styles.socials}>
            <h2>Follow us</h2>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
