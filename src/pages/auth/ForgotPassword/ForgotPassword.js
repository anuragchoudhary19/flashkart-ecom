import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './ForgotPassword.module.css';
import Spinner from '../../../components/Spinner/Spinner';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  useEffect(() => {
    if (user && user.idToken) {
      history.push('/');
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className={classes.form}>
      <ToastContainer />
      <h2>Forgot Password</h2>
      <form onSubmit={submitHandler}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your Email'
          autoFocus
        />
        <button type='submit' disabled={!email}>
          {loading ? <Spinner>Submit</Spinner> : 'Signup'}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
