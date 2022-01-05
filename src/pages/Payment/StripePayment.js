import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../axiosFunctions/stripe';
import { createOrder } from '../../axiosFunctions/user';
import { emptyCart } from '../../axiosFunctions/cart';
import styles from './Payment.module.css';
import './Stripe.css';

const StripePayment = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  useEffect(() => {
    createPaymentIntent(user.token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        if (err) {
          history.goBack();
        }
      });
  }, [history, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //create order and save to Database
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok) {
          //empty cart from local storage
          //empty cart from DB
          emptyCart(user.token)
            .then((res) => {
              if (res.data.ok) {
                if (typeof window !== 'undefined') localStorage.removeItem('cartOnDB');
                //empty redux cart
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: null,
                });
              }
            })
            .then(() => {
              history.push({ pathname: '/payment/success', state: { from: '/payment' } });
            });
        }
      });
      //empty cart from reduc and localstorage
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };
  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <div className={styles.stripCard}>
      <h2>Complete Your Purchase</h2>
      {error ? <h2>Payment Failed</h2> : null}
      {error ? <p className={error ? 'result-message' : 'result-message hidden'}>{error}</p> : null}
      {cart !== null && (
        <p>
          <b>
            {` Amount to be paid : ${cart?.cartTotalAfterDiscount?.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
            })}`}
          </b>
        </p>
      )}
      <br />
      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement id='card-element' options={cartStyle} onChange={handleChange} />
        <button className='stripe-button' disabled={processing || disabled}>
          {!processing && !success && <span id='button-text'>Pay</span>}
          {processing && <span id='button-text'>{<div className='spinner' id='spinner'></div>}</span>}
          {success && <span id='button-text'>Paid</span>}
        </button>
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </form>
      <div className={styles.demo}>
        <p>Demo : 4242 4242 4242 4242 MM(ANY)/YY(ANY)</p>
      </div>
    </div>
  );
};

export default StripePayment;
