import { Collapse } from 'antd';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import './styles.module.scss';

const { Panel } = Collapse;

const questionsAnswers = {
  question1: {
    header: (
      <motion.h4
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        What are the operating hours of Smoove?
      </motion.h4>
    ),
    answer: (
      <p>
        Smoove operates Monday to Saturday from 7 AM to 9 PM, and Sunday from 9
        AM to 8 PM. You can schedule a move on-demand and we'll be there in as
        little as 30 minutes, or you can book for a specific hour of your choice
        up to 90 days in advance. Visit Smoove.homes/book to book your move.
      </p>
    ),
  },
  question2: {
    header: (
      <motion.h4
        initial={{ x: -70, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        How can I request an additional moving crew?
      </motion.h4>
    ),
    answer: (
      <p>
        To request an additional moving crew with Smoove, you can access your
        account dashboard where you can view the status of your ongoing move.
        Within the dashboard, you will find a (Need more crews) button
        available. By clicking on this button and following the prompted steps,
        you can efficiently request an additional moving crew with just a few
        clicks. Smoove streamlines the process to ensure a professional and
        seamless experience in adding extra assistance to your move.
      </p>
    ),
  },

  question3: {
    header: (
      <motion.h4
        initial={{ x: -90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        What are the dimensions of our vehicles?
      </motion.h4>
    ),
    answer: (
      <div>
        <p>
          Please review the following dimensions of Smoove vehicles to ensure
          compatibility with your items.
        </p>

        <br />
        <ul>
          <li>
            <h4>Smoove Pickup Truck:</h4>
            <p>
              Length of 6ft+ and width of 4.5ft. The tailgate can be left open
              for extra length, and all items will be secured with straps during
              transport.
            </p>
          </li>

          <li>
            <h4>Smoove Van:</h4>
            <p>
              Length of 8ft+, width of 4ft, and height of 5ft. Please note that
              king or cal king mattresses will not fit in this vehicle.
            </p>
          </li>

          <li>
            <h4>Smoove XL:</h4>
            <p>Length of 10ft+, width of 6ft, and height of 7ft.</p>
          </li>
        </ul>
      </div>
    ),
  },
  question4: {
    header: (
      <motion.h4
        initial={{ x: -110, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        How many items are included in the price of a move?
      </motion.h4>
    ),
    answer: (
      <p>
        A move covers whatever items can fit into a Smoove Pickup, Smoove Van,
        or Smoove XL. If your items cannot all fit in the vehicle you requested,
        you may need to request an additional vehicle to ensure all your items
        are moved efficiently.
      </p>
    ),
  },
  question5: {
    header: (
      <motion.h4
        initial={{ x: -130, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Will the movers bring my items inside?
      </motion.h4>
    ),
    answer: (
      <p>
        Absolutely! Our movers will pick up and drop off your items right to the
        location of your choice, regardless of the floor or number of stairs.
        Please ensure that the dimensions of your items fit into your desired
        location. If not, simply let your Smoove movers know, and they will
        assist you in finding an alternative location. If you're moving into a
        building with an elevator, please ensure that the elevator is large
        enough to fit your items. If not, please let your Smoove movers know,
        and they will assist you in finding an alternative way. If you would
        like the item(s) returned to the pickup location, you are responsible
        for booking a move to return the item to the pickup location.
      </p>
    ),
  },
};

const FrequentlyAskedQuestions = () => {
  return (
    <div className={styles.container}>
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Frequently asked questions
      </motion.h2>

      <Collapse bordered={false} className={styles.collapse}>
        {Object.keys(questionsAnswers).map((question, index) => (
          <Panel
            header={questionsAnswers[question].header}
            key={index}
            className={styles.panel}
          >
            {questionsAnswers[question].answer}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FrequentlyAskedQuestions;
