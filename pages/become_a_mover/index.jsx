import Head from 'next/head';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';
import { ErrorMessage, Navbar } from '@/components';
import { Footer } from '@/containers';
import { calendar, cash, daily, smile, trucks } from '@/public/images';

const Become_a_mover = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = formData => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Become a mover - Smoove</title>
        <meta
          name='description'
          content={`Join the Smoove Team - Become a Mover and Start Earning Today! Connect with Smoove, your trusted moving partner, to apply and become a mover. Contact us via email for inquiries on available positions, from customer support to business partnerships. Our knowledgeable team is ready to provide prompt assistance and solutions. Aspiring job hunters can inquire about opportunities to start making money as soon as the next day. Stores can also request free flyers to enhance their business. Join Smoove today for a seamless experience and personalized support on your journey to becoming a mover and earning with us.`}
        />
      </Head>

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <div className={styles.backgroundImg}></div>

          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.header}>
                <h1>
                  Earn money with
                  <br /> your truck
                </h1>
                <p>
                  Be active, meet new people daily & <br /> earn up to{' '}
                  <span>$3000</span> a week!
                </p>
              </div>

              <div className={styles.underHeader}>
                <Image src={trucks} alt='company trucks' priority />

                <h2>Need a truck?</h2>
                <p>
                  Don't worry you can still apply as a helper! Owning a vehicle
                  is not a requirement to becoming a Mover. Just select "No" for
                  the question (Do you own a truck and want to use it with
                  Smoove?)
                </p>
              </div>

              <div className={styles.becomeMover}>
                <h1>
                  Become a <span>Smoover</span>
                </h1>

                <ul className={styles.perks}>
                  <li>
                    <Image
                      src={cash}
                      width={50}
                      height={50}
                      alt='cash money icon'
                    />

                    <section>
                      <h3>Earn big tips</h3>
                      <p>
                        Keep 100% of the tips you make and earn more than any
                        other on-demand service as a mover with Smoove.
                      </p>
                    </section>
                  </li>

                  <li>
                    <Image
                      src={calendar}
                      width={50}
                      height={50}
                      alt='calendar icon'
                    />

                    <section>
                      <h3>Be Your own boss</h3>
                      <p>
                        Set your own schedule and work when you want as a mover,
                        enjoying the freedom and flexibility of choosing your
                        work hours.
                      </p>
                    </section>
                  </li>

                  <li>
                    <Image
                      src={smile}
                      width={50}
                      height={50}
                      alt='smile icon'
                    />

                    <section>
                      <h3>Spread joy as a mover</h3>
                      <p>
                        Bring smiles to customers' faces by providing
                        stress-free smooth moving experiences as a mover, and be
                        appreciated for your professionalism and helpfulness.
                      </p>
                    </section>
                  </li>

                  <li>
                    <Image
                      src={daily}
                      width={50}
                      height={50}
                      alt='paid daily icon'
                    />

                    <section>
                      <h3>Get Paid fast</h3>
                      <p>
                        Get paid daily via direct deposit to your bank account,
                        ensuring prompt and reliable payments for your services
                        as a mover with Smoove.
                      </p>
                    </section>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.right}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input}>
                  <label htmlFor='fullName'>Full name</label>
                  <input
                    type='text'
                    id='fullName'
                    placeholder='Enter your name'
                    {...register('fullName', { required: true })}
                  />

                  <section className={styles.error}>
                    <AnimatePresence>
                      {errors.fullName && <ErrorMessage />}
                    </AnimatePresence>
                  </section>
                </div>

                <div className={styles.input}>
                  <label>Mobile phone number</label>
                  <input
                    type='text'
                    id='phoneNumber'
                    placeholder='Enter phone number'
                    {...register('phoneNumber', { required: true })}
                  />

                  <section className={styles.error}>
                    {errors.phoneNumber && (
                      <motion.span>This field is required</motion.span>
                    )}
                  </section>
                </div>

                <button type='submit'>Submit</button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Become_a_mover;
