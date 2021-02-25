import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classes from './Signup.module.css';
import { auth } from '../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner/Spinner';

const SignUp = () => {
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
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    setLoading(false);
    toast.success(`Email is sent to ${email}`);
    window.localStorage.setItem('emailForSignUp', email);
    setEmail('');
  };

  const signupform = () => (
    <form onSubmit={submitHandler}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email...'
        autoFocus
        autoComplete='true'></input>
      <button type='submit'>{loading ? <Spinner>Signup</Spinner> : 'Signup'}</button>
    </form>
  );

  return (
    <div className={classes.form}>
      <ToastContainer />
      <div>
        <h2 style={{ color: '#342ead' }}>SignUp</h2>
      </div>
      {signupform()}
    </div>
  );
};

export default SignUp;
