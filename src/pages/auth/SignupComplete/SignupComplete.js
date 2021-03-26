import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';

import Button from '../../../components/Elements/Button/Button';
import Input from '../../../components/Elements/Input/Input';
import { createOrUpdateUser } from '../../../axiosFunctions/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import classes from './SignupComplete.module.css';

const SignupComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(false);
  const [capital, setCapital] = useState(false);
  const [small, setSmall] = useState(false);
  const [number, setNumber] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    checkPassword(password);
  }, [password]);

  const checkPassword = (password) => {
    password?.length >= 6 ? setLength(true) : setLength(false);
    /[A-Z]/.test(password) ? setCapital(true) : setCapital(false);
    /[a-z]/.test(password) ? setSmall(true) : setSmall(false);
    /[0-9]/.test(password) ? setNumber(true) : setNumber(false);
  };
  const passwordHandler = (e) => {
    let value = e.target.value;
    setError('');
    setPassword(value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password id required');
      return;
    }
    if (password.length < 6) {
      message.error('Password must be atleast 6 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      message.error('Password must have atleast one capital letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      message.error('Password must have atleast one small letter');
      return;
    }
    if (!/[0-9]/.test(password)) {
      message.error('Password must have atleast one number');
      return;
    }
    setLoading(true);
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      // console.log(result)
      if (result.user.emailVerified) {
        // remove user from localstorage
        window.localStorage.removeItem('emailForSignIn');
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // toast.success('Successfully registered')
        //redux store
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
          })
          .catch((err) => console.log(err));
        //redirect
        history.push('/');
      }
      setLoading(false);
    } catch (e) {
      message.error(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
  }, []);

  return (
    <div className={classes.form}>
      <header>Sign Up</header>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <Input type='email' value={email} disabled />
        </div>
        <div>
          <label>Password</label>
          <Input type='password' value={password} change={passwordHandler} autoFocus />
        </div>
        <span>{error}</span>
        <ul>
          <li style={{ color: length ? '#9ede73' : 'grey' }}>Atleast 6 characters long</li>
          <li style={{ color: capital ? '#9ede73' : 'grey' }}>Atleast one capital letter</li>
          <li style={{ color: small ? '#9ede73' : 'grey' }}>Atleast one small letter</li>
          <li style={{ color: number ? '#9ede73' : 'grey' }}>Atleast one number</li>
        </ul>
        <Button type='submit'>{loading ? <LoadingOutlined /> : 'Sign Up'}</Button>
      </form>
    </div>
  );
};

export default SignupComplete;
