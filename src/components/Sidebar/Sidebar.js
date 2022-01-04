import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//components
import Button from '../Elements/Button/Button';
import firebase from 'firebase';
import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../axiosFunctions/auth';
import { message } from 'antd';
import classes from './Sidebar.module.css';

const Sidebar = ({ open, setOpen, setAuthModal }) => {
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));
  const demoEmail = 'anuragdemoemail@gmail.com';
  const demoPassword = 'Password123';
  const history = useHistory();
  let dispatch = useDispatch();
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(demoEmail, demoPassword);
      const { user } = result;
      console.log(result);
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult);

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
        })
        .then(() => {
          setOpen('');
        })
        .catch((err) => {
          message.error('Server Error');
        });
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        message.error('Email is not registered');
      }
      if (error.code === 'auth/wrong-password') {
        message.error('Password do not match');
      }
      setLoading(false);
    }
  };
  const logout = () => {
    firebase.auth().signOut();
    window.localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    if (window.localStorage.getItem('cartOnDB')) {
      window.localStorage.removeItem('cartOnDB');
      dispatch({
        type: 'ADD_TO_CART',
        payload: null,
      });
    }
    setOpen('');
    history.push('/');
  };
  const handleModal = (authModal) => {
    setOpen(false);
    setAuthModal(authModal);
  };
  return (
    <div className={classes.sidebar} style={{ transform: open ? 'translateX(0)' : 'translateX(-150vw)' }}>
      <div className={classes.backdrop} onClick={() => setOpen(!open)}></div>
      <div className={classes.menu} style={{ transform: open ? 'translateX(0)' : 'translateX(-150vw)' }}>
        <div className={classes.close} onClick={() => setOpen(!open)}>
          <svg width='2rem' height='2rem'>
            <line x1='0' y1='0' x2='100%' y2='100%' style={{ stroke: 'var(--white)', strokeWidth: '6' }} />
            <line x1='0' y1='100%' x2='100%' y2='0' style={{ stroke: 'var(--white)', strokeWidth: '6' }} />
          </svg>
        </div>
        <div className={classes.auth}>
          {!user && (
            <div className={classes.authButtons}>
              <Button click={handleDemoLogin} loading={loading}>
                Demo Log In
              </Button>
              <Button click={() => handleModal('login')}> Log In</Button>
              <Button click={() => handleModal('signup')}>Sign Up</Button>
            </div>
          )}
          {user && (
            <div className={classes.links}>
              {user?.role === 'admin' && <Link to='/admin/brand'>Dashboard</Link>}
              {user?.role === 'admin' && <Link to='/admin/orders'>User Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/orders'>My Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/wishlist'>Wishlist</Link>}
              <Link to='/profile'>Profile</Link>
              <span onClick={logout}>Logout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
