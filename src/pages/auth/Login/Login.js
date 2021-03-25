import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../../components/Elements/Input/Input';
import Button from '../../../components/Elements/Button/Button';
import SignInWithGoogle from './images/google.png';
import classes from './Login.module.css';
import { validateEmail } from '../../../functions/validateString';
import { auth, googleAuthProvider } from '../../../firebase';
import { createOrUpdateUser } from '../../../axiosFunctions/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      console.log(intended);
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/brand');
      } else {
        history.push('/');
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === '') {
      message.error('Please enter email');
      return;
    }
    if (password === '') {
      message.error('Please enter password');
      return;
    }
    if (!validateEmail(email)) {
      message.error('Invalid Email');
      return;
    }
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          dispatch({
            type: 'HIDE_MODAL',
            payload: null,
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            dispatch({
              type: 'HIDE_MODAL',
              payload: null,
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showPasswordRecoveryModal = () => {
    dispatch({
      type: 'SHOW_PASSWORD_RECOVERY_MODAL',
      payload: { showPasswordRecoveryModal: true },
    });
  };
  const showSignupAuthModal = () => {
    dispatch({
      type: 'SHOW_SIGNUP_MODAL',
      payload: { showSignupModal: true },
    });
  };
  return (
    <div className={classes.form}>
      <header>Login</header>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          value={email}
          change={(e) => setEmail(e.target.value)}
          placeholder='Email'
          autoFocus
          autoComplete='true'></Input>
        <Input
          type='password'
          value={password}
          change={(e) => setPassword(e.target.value)}
          placeholder='Password'></Input>
        <span onClick={showPasswordRecoveryModal}>Forgot Password?</span>
        <Button type='submit'>{loading ? <LoadingOutlined /> : 'Login'}</Button>
      </form>
      <p>or</p>
      <div className={classes.google} onClick={loginWithGoogle}>
        <img src={SignInWithGoogle} alt='' />
      </div>
      <span onClick={showSignupAuthModal}>New User? Create an account</span>
    </div>
  );
};

export default Login;
