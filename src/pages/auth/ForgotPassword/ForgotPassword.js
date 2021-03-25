import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ForgotPassword.module.css';
import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';
import { LoadingOutlined } from '@ant-design/icons';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    if (user && user.token) {
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
        dispatch({
          type: 'HIDE_MODAL',
          payload: null,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const showSignupAuthModal = () => {
    dispatch({
      type: 'SHOW_SIGNUP_MODAL',
      payload: { showSignupModal: true },
    });
  };
  const showLoginAuthModal = () => {
    dispatch({
      type: 'SHOW_LOGIN_MODAL',
      payload: { showLoginModal: true },
    });
  };

  return (
    <div className={classes.form}>
      <header>Forgot Password</header>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          value={email}
          change={(e) => setEmail(e.target.value)}
          placeholder='Enter your Email'
          autoFocus
          autoComplete
        />
        <Button type='submit' disabled={!email}>
          {loading ? <LoadingOutlined /> : 'Send Link'}
        </Button>
        <Button click={showLoginAuthModal}>Log In</Button>
        <Button click={showSignupAuthModal}>New User?Create an account</Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
