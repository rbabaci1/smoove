import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse } from 'antd';
import { CiSearch } from 'react-icons/ci';

import {
  Footer,
  FrequentlyAskedQuestions,
  GetAnEstimate,
  CustomersReviews,
} from '@/containers';
import { Navbar } from '@/components';
import { help } from '@/public/images';
import styles from './styles.module.scss';

const questions = [
  {
    text: 'How does Smoove work?',
    title: <h4>How does Smoove work?</h4>,
    answer:
      'Smoove is a platform that connects you with professional movers and a truck to help you with your local moves. You can schedule a move, choose the type of service you need, and track your move in real-time.',
  },
  {
    text: 'What types of moves does Smoove offer?',
    title: <h4>What types of moves does Smoove offer?</h4>,
    answer:
      'Smoove offers a variety of services for local moves, including full-service moves, in-house moves, loading and unloading services, and furniture delivery. You can choose the service that best fits your needs and budget.',
  },
  {
    text: 'How do I schedule a move with Smoove?',
    title: <h4>How do I schedule a move with Smoove?</h4>,
    answer:
      'You can schedule a move with Smoove by visiting our website or downloading our mobile app. Simply input your move details, choose the service you need, and book a move date and time that works for you.',
  },
  {
    text: 'What areas does Smoove serve?',
    title: <h4>What areas does Smoove serve?</h4>,
    answer:
      'Smoove currently operates in select cities across the United States. You can check if we serve your area by visiting our website or contacting our customer support.',
  },
  {
    text: 'How much does Smoove cost?',
    title: <h4>How much does Smoove cost?</h4>,
    answer:
      'The cost of a move with Smoove depends on various factors such as the distance of the move, the size of your belongings, and the services you require. You can get a quote by providing your move details on our website or app.',
  },
  {
    text: 'Can I reschedule or cancel my Smoove move?',
    title: <h4>Can I reschedule or cancel my Smoove move?</h4>,
    answer:
      'Yes, you can reschedule or cancel your Smoove move. Simply log in to your account on our website or app, go to your bookings, and follow the instructions to reschedule or cancel your move. Please note that cancellation fees may apply.',
  },
  {
    text: 'What should I do to prepare for my Smoove move?',
    title: <h4>What should I do to prepare for my Smoove move?</h4>,
    answer:
      'To prepare for your Smoove move, make sure your belongings are packed securely in boxes or containers, disassemble any furniture that needs to be moved, and ensure that there is clear access to your items. You can also provide any special instructions or requirements during the booking process.',
  },
  {
    text: 'Is my stuff insured during a Smoove move?',
    title: <h4>Is my stuff insured during a Smoove move?</h4>,
    answer:
      "Yes, Smoove provides basic insurance coverage for your items during the move. However, it's important to note that the coverage may be limited, and additional insurance options may be available for purchase. It's recommended to review Smoove's insurance policy for more details.",
  },
  {
    text: 'How do I track my Smoove move?',
    title: <h4>How do I track my Smoove move?</h4>,
    answer:
      "You can track your Smoove move in real-time through our website or app. Simply log in to your account, go to your bookings, and you'll be able to see the status and progress of your move, including the estimated arrival time of your movers.",
  },
  {
    text: 'What if there are issues or concerns during my Smoove move?',
    title: <h4>What if there are issues or concerns during my Smoove move?</h4>,
    answer:
      'If you encounter any issues or have concerns during your Smoove move, you can contact our customer support through our website or app. Our team will be ready to assist you and resolve any problems to ensure a smooth moving experience.',
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Smoove - Help Center</title>
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

            <motion.section
              className={styles.questions}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {searchTerm && searchTerm.trim() !== ''
                  ? questions
                      .filter(question =>
                        question.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((question, index) => (
                        <Collapse
                          key={index}
                          className={styles.collapse}
                          bordered={false}
                        >
                          <Collapse.Panel
                            header={
                              <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                layout
                              >
                                {question.title}
                              </motion.div>
                            }
                            key={index}
                          >
                            <p>{question.answer}</p>
                          </Collapse.Panel>
                        </Collapse>
                      ))
                  : null}
              </AnimatePresence>
            </motion.section>
          </div>

          <Image
            className={styles.helpImg}
            src={help}
            alt='customer getting help via internet'
            priority
          />
        </div>

        <FrequentlyAskedQuestions />
        <CustomersReviews />
        <GetAnEstimate bgColor='#fff' />
        <Footer />
      </div>
    </>
  );
};

export default Help;
