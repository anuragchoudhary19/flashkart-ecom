import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './Payment.module.css';
import StripePayment from './StripePayment';
//load stripe outside of component render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className={styles.payment}>
      <h4>Complete Your Purchase</h4>
      <h6>Pay:INR</h6>
      <Elements stripe={promise}>
        <div className={styles.stripCard}>
          <StripePayment />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
