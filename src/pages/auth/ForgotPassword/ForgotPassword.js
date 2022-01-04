import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';

import { validateEmail } from '../../../functions/validateString';
import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';

import { message } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import classes from './ForgotPassword.module.css';

function ForgotPassword({ setOpen }) {
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
  }, [history, user]);

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

  return (
    <div className={classes.modal}>
      <header>
        <h1>Recover Password</h1>
        <span>
          <CloseOutlined style={{ color: 'white' }} onClick={() => setOpen('')} />
        </span>
      </header>
      <div className={classes.form}>
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
        </form>
        <span className={classes.divider}>
          <strong>or</strong>
        </span>
        <div className={classes.options}>
          <Button click={() => setOpen('login')}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
