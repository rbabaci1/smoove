import Image from 'next/image';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { BsBrowserChrome } from 'react-icons/bs';
import { FaTruckLoading } from 'react-icons/fa';
import { FaGratipay } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { howItWorks1, howItWorks2, howItWorks3 } from '/public/images';
import styles from './styles.module.scss';
import 'react-vertical-timeline-component/style.min.css';

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>How it works</h2>
        <span>3 easy steps to move anything!</span>
      </motion.div>

      <div className={styles.steps}>
        <VerticalTimeline
          lineColor='#edf2f8'
          className={styles.verticalTimeline}
        >
          <VerticalTimelineElement
            contentStyle={{
              boxShadow: '0 1px #edf2f8',
            }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<BsBrowserChrome />}
            className={styles.step}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image src={howItWorks1} alt='first moving step is to book' />
              <h3>Book your move</h3>

              <p>
                Choose your desired moving date, provide us with the pickup and
                drop-off addresses, and select the appropriate service package
                that suits your needs.
              </p>
            </motion.div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            contentStyle={{ boxShadow: '0 1px #edf2f8' }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<FaTruckLoading />}
            className={styles.step}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image src={howItWorks2} alt='we move your items' />

              <h3>We handle it from here</h3>
              <p>
                Sit back and relax as our experienced team arrives on the
                scheduled date to handle all the heavy lifting, packing, and
                transportation with care, ensuring a smooth moving experience!
              </p>
            </motion.div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            contentStyle={{ boxShadow: '0 1px #edf2f8' }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<FaGratipay />}
            className={styles.step}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image src={howItWorks3} alt='moving is done' />
              <h3>Review & tip</h3>
              <p>
                Share your feedback by rating your overall experience. If you
                are satisfied with our exceptional service, you have the option
                to express appreciation to our hardworking team by leaving a
                well-deserved tip as a gesture of gratitude!
              </p>
            </motion.div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default HowItWorks;
