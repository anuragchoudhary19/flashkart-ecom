import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//components
import Button from '../Elements/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Search from '../Search/Search';
//functions
import firebase from 'firebase';
import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../axiosFunctions/auth';
//css
import classes from './Header.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Modal from '../Modal/Modal';

function Header() {
  const [isOpen, setIsOpen] = useState('');
  const demoEmail = 'anuragdemoemail@gmail.com';
  const demoPassword = 'Password123';
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  let { user, cart } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

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
    history.push('/');
  };

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
          setIsOpen('');
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

  return (
    <div className={classes.header}>
      <div className={classes.home}>
        <NavLink to='/'>FlashKart</NavLink>
      </div>
      <Search />
      <div>
        {!user && (
          <div className={classes.actions}>
            <Button click={handleDemoLogin} loading={loading}>
              Demo Log In
            </Button>
            <Button click={() => setIsOpen('login')}> Log In</Button>
            <Button click={() => setIsOpen('signup')}>Sign Up</Button>
          </div>
        )}
        {user && (
          <div
            className={classes.dropdown}
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}>
            <div className={classes.avatar}>
              <Avatar
                shape='circle'
                size={42}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </div>
            <Dropdown dropdown={dropdown}>
              {user?.role === 'admin' && <Link to='/admin/brand'>Dashboard</Link>}
              {user?.role === 'admin' && <Link to='/admin/orders'>User Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/orders'>My Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/wishlist'>Wishlist</Link>}
              <Link to='/admin/profile'>Profile</Link>
              <span onClick={logout}>Logout</span>
            </Dropdown>
          </div>
        )}
        <div className={classes.cart}>
          <Link to={'/cart'}>
            <Badge count={cart?.products?.length} style={{ backgroundColor: 'red', color: '#e6e6e6' }}>
              <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
            </Badge>
          </Link>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Header;
