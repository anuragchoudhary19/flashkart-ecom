import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../../components/Elements/Input/Input';
import Button from '../../../components/Elements/Button/Button';

import SignInWithGoogle from './images/google.png';

import { validateEmail } from '../../../functions/validateString';
import { auth, googleAuthProvider } from '../../../firebase';
import { createOrUpdateUser } from '../../../axiosFunctions/auth';
import { CloseOutlined } from '@ant-design/icons';
import { message } from 'antd';
import classes from './Login.module.css';

const Login = ({ setOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  let history = useHistory();
  let dispatch = useDispatch();

  const roleBasedRedirect = (role) => {
    let intended = history.location.state;
    if (intended) {
      console.log(intended);
      history.push(intended.from);
    } else {
      if (role === 'admin') {
        history.push('/admin/brand');
      } else {
        history.push('/');
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === '') {
      message.error('Email is required');
      return;
    }
    if (password === '') {
      message.error('Password is required');
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
          console.log(res.data);
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
          return res.data.role;
        })
        .then((role) => {
          roleBasedRedirect(role);
        })
        .then(() => {
          setOpen(false);
        })

        .catch((err) => {
          message.error('Server Error');
        });
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError({ ...error, email: 'Email is not registered' });
      }
      if (error.code === 'auth/wrong-password') {
        setError({ ...error, password: 'Password do not match' });
      }
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
            return res.data.role;
          })
          .then((role) => {
            roleBasedRedirect(role);
          })
          .then(() => {
            setOpen(false);
          })
          .catch((err) => {
            setError('Error in Sign In with Google');
            console.log(err);
          });
      })
      .catch((err) => {
        setError('Error in Sign In with Google');
        console.log(err);
      });
  };

  return (
    <div className={classes.modal}>
      <span className={classes.close}>
        <CloseOutlined style={{ color: '#d3f6cb' }} onClick={() => setOpen('')} />
      </span>
      <header>
        <h1>Log In</h1>
      </header>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <div>
            <label>Email</label>
            <Input
              type='email'
              error={error.email}
              value={email}
              change={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoFocus
              autoComplete='true'
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type='password'
              error={error.password}
              value={password}
              change={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>
          <span className={classes.error}>{error.email || error.password}</span>
          <Button type='submit' loading={loading}>
            Log In
          </Button>
        </form>
        <div className={classes.options}>
          <button onClick={() => setOpen('signup')}>New User? Sign Up</button>
          <button onClick={() => setOpen('passwordRecovery')}>Forgot Password?</button>
        </div>
        <span className={classes.divider}>
          <strong>or</strong>
        </span>
        <div className={classes.google} onClick={loginWithGoogle}>
          <img src={SignInWithGoogle} alt='Signin With Google' />
        </div>
      </div>
    </div>
  );
};

export default Login;
