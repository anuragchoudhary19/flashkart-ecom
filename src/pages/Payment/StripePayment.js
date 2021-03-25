import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../axiosFunctions/stripe';
import { createOrder } from '../../axiosFunctions/user';
import { emptyCart } from '../../axiosFunctions/cart';
import styles from './Payment.module.css';
import './Stripe.css';
const StripePayment = ({ history }) => {
  const dispatch = useDispatch();
  const { user, localCart } = useSelector((state) => ({ ...state }));
  const [succeedded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log('create payment intent', res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

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
      //create orderand save to Database
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok) {
          //empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('localCart');
          //empty redux cart
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
          //empty cart from DB
          emptyCart(user.idToken);
        }
      });
      //empty cart from reduc and localstorage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
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
      {succeedded || error ? null : <h2>Complete Your Purchase</h2>}
      <p>Use this card number for dummy payment</p>
      <p>4242 4242 4242 4242</p>
      {succeedded ? <h2>Payment Successful</h2> : null}
      {error ? <h2>Payment Failed</h2> : null}
      {succeedded ? (
        <p className={succeedded ? 'result-message' : 'result-message hidden'}>
          Payment Successful<Link to='/user/orders'>See it in your orders</Link>
        </p>
      ) : null}
      <div>Amount to be paid : {localCart.totalDiscountedPrice.toLocaleString('en-IN')}</div>

      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement id='card-element' options={cartStyle} onChange={handleChange} />
        <button className='stripe-button' disabled={processing || disabled || succeedded}>
          <span id='button-text'>{processing ? <div className='spinner' id='spinner'></div> : 'Pay'}</span>
        </button>
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default StripePayment;
