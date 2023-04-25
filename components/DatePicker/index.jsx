import { useState, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import { setMovingDate } from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const NextJSDatePicker = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, 'EEEE, MMM do');

  useEffect(() => {
    dispatch(setMovingDate(formattedDate));
  }, [dispatch, formattedDate, selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // calculate date range
  const today = new Date();
  const dateRange = Array.from({ length: 30 }, (_, i) => addDays(today, i));

  // calculate index for end of first date range
  const endOfFirstRangeIndex = Math.min(5, dateRange.length) - 1;

  // state to track whether to show more dates
  const [showMoreDates, setShowMoreDates] = useState(false);

  // return JSX
  return (
    <div className={styles.container}>
      <h3>What day are you moving?</h3>

      <div className={styles.days}>
        {dateRange.slice(0, endOfFirstRangeIndex + 1).map((date, i) => {
          const dayOfWeek = date
            .toLocaleString('en-us', { weekday: 'short' })
            .toUpperCase();

          if (date.getDate() === 1) {
            setFirstMonthName(format(date, 'MMMM'));
          }

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

        {showMoreDates ? (
          <>
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
          </>
        ) : (
          <div
            className={styles.moreBtn}
            onClick={() => setShowMoreDates(true)}
          >
            <AiOutlineDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default NextJSDatePicker;
