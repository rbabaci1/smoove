import Image from 'next/image';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { BsBrowserChrome } from 'react-icons/bs';
import { FaTruckLoading } from 'react-icons/fa';
import { FaGratipay } from 'react-icons/fa';

import { howItWorks1, howItWorks2, howItWorks3 } from '/public/images';
import styles from './styles.module.scss';
import 'react-vertical-timeline-component/style.min.css';

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h2>How it works</h2>
      <span>3 easy steps to move anything!</span>

      <div className={styles.steps}>
        <VerticalTimeline
          lineColor='#edf2f8'
          className={styles.verticalTimeline}
        >
          <VerticalTimelineElement
            contentStyle={{ boxShadow: '0 3px #edf2f8' }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            date={<h2>Book your move</h2>}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<BsBrowserChrome />}
          >
            <div className={styles.step}>
              <Image src={howItWorks1} alt='first moving step is to book' />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                blanditiis voluptate expedita sit labore. Maiores laborum
                quibusdam amet ut inventore dignissimos iusto veniam quos
                obcaecati quo? Laboriosam magnam perspiciatis aperiam
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            contentStyle={{ boxShadow: '0 3px #edf2f8' }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            date={<h2>We handle it from here</h2>}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<FaTruckLoading />}
          >
            <div className={styles.step}>
              <Image src={howItWorks2} alt='we move your items' />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                blanditiis voluptate expedita sit labore. Maiores laborum
                quibusdam amet ut inventore dignissimos iusto veniam quos
                obcaecati quo? Laboriosam magnam perspiciatis aperiam
              </p>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            contentStyle={{ boxShadow: '0 3px #edf2f8' }}
            contentArrowStyle={{ borderRight: '7px solid  #410eff' }}
            date={<h2>Review and tip</h2>}
            iconStyle={{ background: '#e76b4a', color: '#fff' }}
            icon={<FaGratipay />}
          >
            <div className={styles.step}>
              <Image src={howItWorks3} alt='moving is done' />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                blanditiis voluptate expedita sit labore. Maiores laborum
                quibusdam amet ut inventore dignissimos iusto veniam quos
                obcaecati quo? Laboriosam magnam perspiciatis aperiam
              </p>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default HowItWorks;
