import React, { useState, useEffect } from 'react';
import Modal from '../../../components/Modal/Modal';
import Signup from '../Signup/Signup';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { Link, useHistory } from 'react-router-dom';
import classes from './Login.module.css';
import { auth, googleAuthProvider } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner/Spinner';
import { createOrUpdateUser } from '../../../axiosFunctions/auth';

const Login = (props) => {
  const [email, setEmail] = useState('anurag.typhoon@gmail.com');
  const [password, setPassword] = useState('qwertyuiop');
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user, authModal } = useSelector((state) => ({ ...state }));

  let history = useHistory();
  let dispatch = useDispatch();

  // useEffect(() => {

  //   if (user && user.idToken) {
  //     console.log(props);
  //     history.push('/user/dashboard');
  //   }
  // }, [user]);

  useEffect(() => {
    if (!props.show) {
      setShowLogin(true);
      setShowSignup(false);
      setShowForgotPassword(false);
    }
  }, [props]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/account');
    } else {
      history.push('/user/account');
      console.log(history);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
              idToken: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
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
          dispatch({
            type: 'HIDE_MODAL',
            payload: false,
          });
          roleBasedRedirect(res);
          history.push('/');
        })
        .catch((err) => console.log(err));

      props.hide();
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
                idToken: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginform = () => (
    <form onSubmit={submitHandler}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        autoFocus
        autoComplete='true'></input>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'></input>
      <button type='submit'>{loading ? <Spinner>Login</Spinner> : 'Login'}</button>
    </form>
  );

  const loadSignupForm = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowForgotPassword(false);
  };
  const loadLoginForm = () => {
    setShowSignup(false);
    setShowLogin(true);
    setShowForgotPassword(false);
  };

  const loadForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  let loadedForm = null;
  if (showLogin) {
    loadedForm = (
      <div className={classes.form}>
        <div>
          <h2 style={{ color: '#342ead' }}>Login</h2>
        </div>
        <br />
        {loginform()}
        <div>
          <button style={{ backgroundColor: '#ea6227' }} onClick={loginWithGoogle} type='submit'>
            Login with Google
          </button>
        </div>
        <div className={classes.options}>
          <div>
            <button onClick={loadSignupForm}>New User? SignUp</button>
          </div>
          <div>
            <button onClick={loadForgotPassword}>Forgot Password</button>
          </div>
        </div>
      </div>
    );
  } else if (showSignup) {
    loadedForm = (
      <>
        <Signup />
        <div className={classes.form}>
          <div>
            <button onClick={loadLoginForm}>Login</button>
          </div>
        </div>
      </>
    );
  } else if (showForgotPassword) {
    loadedForm = (
      <>
        <ForgotPassword />
        <div className={classes.options}>
          <div>
            <button onClick={loadLoginForm}>Login</button>
          </div>
          <div>
            <button onClick={loadSignupForm}>New User? SignUp</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <Modal>
      <br />
      {loadedForm}
    </Modal>
  );
};

export default Login;
