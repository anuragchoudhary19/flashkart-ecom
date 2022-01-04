import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';

import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';

import { checkDuplicateEmail } from '../../../axiosFunctions/auth';
import { validateEmail } from '../../../functions/validateString';
import { message } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Signup.module.css';

const SignUp = ({ setOpen }) => {
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

  return (
    <div className={styles.modal}>
      <header>
        <h1>Sign Up</h1>
        <span>
          <CloseOutlined style={{ color: 'white' }} onClick={() => setOpen('')} />
        </span>
      </header>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <div>
            <label>Email</label>
            <Input
              type='email'
              error={error}
              value={email}
              change={inputHandle}
              placeholder=' Email'
              autoFocus={true}></Input>
          </div>
          <span>{error}</span>
          <Button type='submit'>{loading ? <LoadingOutlined /> : 'Sign Up'}</Button>
        </form>
        <span className={styles.divider}>
          <strong>Already have an account?</strong>
        </span>
        <Button click={() => setOpen('login')}>Log In</Button>
      </div>
    </div>
  );
};

export default SignUp;
