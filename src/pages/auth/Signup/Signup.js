import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';
import classes from './Signup.module.css';
import { auth } from '../../../firebase';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem('emailForSignUp', email);
    setLoading(false);
    setEmail('');
    message.success(`SignIn link was sent to ${email}`, 2).then(() => {
      dispatch({
        type: 'HIDE_MODAL',
        payload: null,
      });
    });
  };
  const showPasswordRecoveryModal = () => {
    dispatch({
      type: 'SHOW_PASSWORD_RECOVERY_MODAL',
      payload: { showPasswordRecoveryModal: true },
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
      <header>Sign Up</header>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          error=''
          value={email}
          change={(e) => setEmail(e.target.value)}
          placeholder='Email'
          autoFocus
          autoComplete='true'></Input>
        <Button type='submit'>{loading ? <LoadingOutlined /> : 'Sign Up'}</Button>
        <Button click={showLoginAuthModal}>Log In</Button>
      </form>
    </div>
  );
};

export default SignUp;
