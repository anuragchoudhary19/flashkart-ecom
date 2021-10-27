import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './Payment.module.css';
import StripePayment from './StripePayment';
//load stripe outside of component render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  let history = useHistory();

  useEffect(() => {
    let { location } = history;
    let { state } = location;
    if (state?.from !== '/checkout') {
      history.push('/');
    }
  }, [history]);
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Elements stripe={promise}>
          <StripePayment />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
