import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import {
  goToNextEstimateStep,
  setPaymentMethod,
} from '@/state/reduxSlices/orderSlice';
import { getCardImgSrc, getUserPaymentMethods } from '@/lib';
import { AddPaymentMethod } from '@/components';
import styles from './styles.module.scss';

const PaymentMethodStep = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { paymentMethod } = useSelector(state => state.order);

  const methodsRef = useRef(null);
  const selectRef = useRef(null);

  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [fetchingMethods, setFetchingMethods] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const paymentMethods = await getUserPaymentMethods(
          user.uid,
          setFetchingMethods
        );

        setPaymentMethods(paymentMethods);

        // Check if payment methods exist
        if (paymentMethods?.length > 0) {
          setShowAddPaymentMethod(false);
          const { brand, last4 } = paymentMethods[0].card;

          dispatch(
            setPaymentMethod({ id: paymentMethods[0].id, brand, last4 })
          );
        } else {
          setShowAddPaymentMethod(true);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error(error.message);
      }
    };

    if (user) {
      fetchPaymentMethods();
    }
  }, [dispatch, user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        methodsRef.current &&
        !methodsRef.current.contains(event.target) &&
        !selectRef.current.contains(event.target)
      ) {
        setShowMethods(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectMethod = method => {
    const { brand, last4 } = method.card;

    dispatch(setPaymentMethod({ id: method.id, brand, last4 }));
    setShowMethods(false);
  };

  const toggleMethods = () => {
    setShowMethods(!showMethods);
  };

  return (
    <div
      className={`${styles.container} ${
        fetchingMethods ? styles.fetchingMethods : ''
      }`}
    >
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme='colored'
        pauseOnHover={false}
      />

      <div className={styles.paymentMethods}>
        {fetchingMethods ? (
          <AiOutlineLoading3Quarters className={`${styles.loading} loading`} />
        ) : (
          <>
            <h3>
              Payment Information
              {showAddPaymentMethod && paymentMethod && (
                <AiFillCloseCircle
                  onClick={() => setShowAddPaymentMethod(false)}
                />
              )}
            </h3>

            {showAddPaymentMethod ? (
              <div className={styles.paymentMethods__input}>
                <AddPaymentMethod
                  setShowAddPaymentMethod={setShowAddPaymentMethod}
                  paymentMethods={paymentMethods}
                  setPaymentMethods={setPaymentMethods}
                />
              </div>
            ) : (
              <>
                <div
                  className={styles.methodSelection}
                  onClick={toggleMethods}
                  ref={selectRef}
                >
                  {paymentMethod ? (
                    <div className={styles.selectedMethod}>
                      <Image
                        src={getCardImgSrc(paymentMethod.brand)}
                        alt='credit card sign'
                        height={40}
                        width={40}
                      />
                      <section>
                        {paymentMethod.brand.charAt(0).toUpperCase() +
                          paymentMethod.brand.slice(1)}{' '}
                        ending in <span>...{paymentMethod.last4}</span>
                      </section>
                    </div>
                  ) : (
                    <p>Select a method</p>
                  )}

                  {showMethods ? (
                    <RiArrowDropUpLine />
                  ) : (
                    <RiArrowDropDownLine />
                  )}
                </div>

                <AnimatePresence>
                  {showMethods && (
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      className={styles.methods}
                      ref={methodsRef}
                    >
                      {paymentMethods.map(method => {
                        const { brand, last4 } = method.card;

                        if (paymentMethod?.last4 === last4) return;

                        return (
                          <div
                            className={styles.method}
                            key={method.id}
                            onClick={() => selectMethod(method)}
                          >
                            <Image
                              src={getCardImgSrc(brand)}
                              alt='Credit card sign'
                              height={40}
                              width={40}
                            />
                            <section>
                              {brand.charAt(0).toUpperCase() + brand.slice(1)}{' '}
                              ending in <span>...{last4}</span>
                            </section>
                          </div>
                        );
                      })}

                      {paymentMethods.length === 1 ? (
                        <span className={styles.noOtherMethods}>
                          No other methods
                        </span>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={styles.buttons}>
                  <button
                    onClick={() => setShowAddPaymentMethod(true)}
                    disabled={showMethods}
                  >
                    Add card
                  </button>

                  <AnimatePresence>
                    {paymentMethod && (
                      <motion.button
                        className={styles.bookBtn}
                        onClick={() => dispatch(goToNextEstimateStep())}
                        disabled={showMethods}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                      >
                        Proceed to checkout
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStep;
