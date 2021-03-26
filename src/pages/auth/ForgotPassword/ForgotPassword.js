import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';

import { validateEmail } from '../../../functions/validateString';
import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';

import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './ForgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
    if (!validateEmail(email)) {
      setError('Email not valid');
      return;
    }
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        message.success(`Password reset link was sent to '${email}'`);
        setEmail('');
        setLoading(false);
        dispatch({
          type: 'HIDE_MODAL',
          payload: null,
        });
      })
      .catch((err) => {
        message.success(`Password reset link could not be sent`);
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
      <header>Reset Password</header>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <Input
            type='email'
            value={email}
            error={error}
            change={(e) => setEmail(e.target.value)}
            placeholder='Email'
            autoFocus
            autoComplete
            required
          />
        </div>
        <span>{error}</span>
        <Button type='submit' disabled={!email}>
          {loading ? <LoadingOutlined /> : 'Send Link'}
        </Button>
        <span>
          <b>or</b>
        </span>
        <Button click={showLoginAuthModal}>Log In</Button>
        <Button click={showSignupAuthModal}>New User?Create an account</Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
