import React, { useState, useEffect } from 'react';
import classes from './SignupComplete.module.css';
import { auth } from '../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../../axiosFunctions/auth';

const SignupComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error('Email and Password cannot be empty');
    }
    if (password.length < 6) {
      toast.error('Password must be more than 6 characters long');
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      // console.log(result)
      if (result.user.emailVerified) {
        // remove user from localstorage
        window.localStorage.removeItem('emailForSignUp');
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
                idToken: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        //redirect
        history.push('/');
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignUp'));
  }, []);

  const signupCompleteform = () => (
    <form onSubmit={submitHandler}>
      <input type='email' value={email} placeholder='Please enter your email...' disabled autoFocus></input>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} autoFocus></input>
      <button type='submit'>SignUp</button>
    </form>
  );

  return (
    <div className={classes.signupModal}>
      <div>
        <h4 style={{ color: '#fff' }}>SignUp</h4>
      </div>
      {signupCompleteform()}
      <ToastContainer />
    </div>
  );
};

export default SignupComplete;
