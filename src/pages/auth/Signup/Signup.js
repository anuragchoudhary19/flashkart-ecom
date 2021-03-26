import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';

import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';

import { checkDuplicateEmail } from '../../../axiosFunctions/auth';
import { validateEmail } from '../../../functions/validateString';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Signup.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const inputHandle = (e) => {
    setError('');
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const ok = validateEmail(email);
    if (!ok) {
      setError('Invalid email');
      return;
    }
    const res = await checkDuplicateEmail(email);
    if (res.data.duplicate) {
      console.log('duplicate');
      setError('Email already registered');
      return;
    }

    setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem('emailForSignIn', email);
    setLoading(false);
    setEmail('');
    message.success(`SignIn link was sent to ${email}`, 3).then(() => {
      dispatch({
        type: 'HIDE_MODAL',
        payload: null,
      });
    });
  };
  const showLoginAuthModal = () => {
    dispatch({
      type: 'SHOW_LOGIN_MODAL',
      payload: { showLoginModal: true },
    });
  };
  return (
    <div className={styles.form}>
      <header>Sign Up</header>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <Input
            type='email'
            error={error}
            value={email}
            change={inputHandle}
            placeholder=' Email'
            autoFocus
            autoComplete></Input>
        </div>
        <span>{error}</span>
        <Button type='submit'>{loading ? <LoadingOutlined /> : 'Sign Up'}</Button>
        <span>
          <b>or</b>
        </span>
        <Button click={showLoginAuthModal}>Log In</Button>
      </form>
    </div>
  );
};

export default SignUp;
