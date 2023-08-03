import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import { setMovingDate } from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const NextJSDatePicker = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [screenWidth, setScreenWidth] = useState(null);

  const formattedDate = format(selectedDate, 'EEEE, MMM do');

  useEffect(() => {
    dispatch(setMovingDate(formattedDate));

    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    // Set initial width on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, formattedDate, selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // calculate date range
  const today = new Date();
  const dateRange = Array.from({ length: 30 }, (_, i) => addDays(today, i));

  // calculate index for end of first date range
  const endOfFirstRangeIndex =
    Math.min(screenWidth > 767 ? 5 : 3, dateRange.length) - 1;

  // state to track whether to show more dates
  const [showMoreDates, setShowMoreDates] = useState(false);

  return (
    <div className={styles.container}>
      <h3>What day are you moving?</h3>

      <div className={styles.days}>
        {dateRange.slice(0, endOfFirstRangeIndex + 1).map((date, i) => {
          const dayOfWeek = date
            .toLocaleString('en-us', { weekday: 'short' })
            .toUpperCase();

          const isStartOfMonth = date.getDate() === 1;

          return (
            <div
              className={`${styles.day} ${
                isStartOfMonth ? styles.firstDayOfMonth : ''
              } ${
                date.getDate() === selectedDate.getDate()
                  ? styles.selectedDate
                  : ''
              }`}
              key={i}
              onClick={() => handleDateChange(date)}
            >
              {isStartOfMonth ? (
                <span>{format(date, 'MMMM')}</span>
              ) : (
                <span>{dayOfWeek}</span>
              )}

              <h4>{date.getDate()}</h4>
            </div>
          );
        })}

        <AnimatePresence>
          {showMoreDates ? (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              {dateRange.slice(endOfFirstRangeIndex + 1).map((date, i) => {
                const dayOfWeek = date
                  .toLocaleString('en-us', { weekday: 'short' })
                  .toUpperCase();

                const isStartOfMonth = date.getDate() === 1;

                return (
                  <div
                    className={`${styles.day} ${
                      isStartOfMonth ? styles.firstDayOfMonth : ''
                    } ${
                      date.getDate() === selectedDate.getDate()
                        ? styles.selectedDate
                        : ''
                    }`}
                    key={i}
                    onClick={() => handleDateChange(date)}
                  >
                    {isStartOfMonth ? (
                      <span>{format(date, 'MMMM')}</span>
                    ) : (
                      <span>{dayOfWeek}</span>
                    )}
                    <h4>{date.getDate()}</h4>
                  </div>
                );
              })}

              <div
                className={styles.lessBtn}
                onClick={() => setShowMoreDates(false)}
              >
                <AiOutlineUp />
              </div>
            </motion.section>
          ) : (
            <motion.div
              className={styles.moreBtn}
              onClick={() => setShowMoreDates(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AiOutlineDown />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NextJSDatePicker;
