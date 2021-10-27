import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Payment.module.css';

const PaymentSuccessful = () => {
  let history = useHistory();
  useEffect(() => {
    let { location } = history;
    let { state } = location;
    if (state?.from !== '/payment') {
      history.push('/');
    }
  }, [history]);
  return (
    <div className={styles.page}>
      <div className={styles.paymentSuccess}>
        <h2>Payment Successful</h2>
        <p className={'result-message'}>
          <Link to='/user/orders'>
            <span>See it in your orders section</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
