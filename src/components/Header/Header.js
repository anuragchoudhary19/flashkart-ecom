import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//components
import Button from '../Elements/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
//functions
import firebase from 'firebase';
import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../axiosFunctions/auth';
//css
import classes from './Header.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Modal from '../../pages/auth/Modal/Modal';
import Search from './../Search/Search';
import Sidebar from '../Sidebar/Sidebar';

function Header() {
  const [open, setOpen] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false);
  const demoEmail = 'anuragdemoemail@gmail.com';
  const demoPassword = 'Password123';
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  let { user, cart } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  const history = useHistory();

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
  const style = { border: '2px solid var(--white)' };
  return (
    <div className={classes.header}>
      <div className={classes.home}>
        <div className={classes.menuIcon} onClick={() => setOpenSidebar(true)}>
          <MenuOutlined />
        </div>
        <Link to='/'>FlashKart</Link>
      </div>
      <div className={classes.search}>
        <Search />
      </div>
      <div className={classes.menu}>
        {!user && (
          <div className={classes.authButtons}>
            <Button click={handleDemoLogin} loading={loading}>
              Demo Log In
            </Button>
            <Button click={() => setOpen('login')}> Log In</Button>
            <Button click={() => setOpen('signup')}>Sign Up</Button>
          </div>
        )}
        {user && (
          <div
            className={classes.dropdown}
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}>
            <div className={classes.avatar}>
              <Avatar shape='circle' size={42} icon={<UserOutlined />} style={style} />
            </div>
            <Dropdown dropdown={dropdown}>
              {user?.role === 'admin' && <Link to='/admin/brand'>Dashboard</Link>}
              {user?.role === 'admin' && <Link to='/admin/orders'>User Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/orders'>My Orders</Link>}
              {user?.role === 'subscriber' && <Link to='/user/wishlist'>Wishlist</Link>}
              <Link to='/profile'>Profile</Link>
              <span onClick={logout}>Logout</span>
            </Dropdown>
          </div>
        )}
        <div className={classes.cart}>
          <Link to={'/cart'} className={classes.cartCount}>
            <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
            {cart?.products?.length > 0 && (
              <div style={{ backgroundColor: 'red', color: '#e6e6e6' }}>{cart?.products?.length}</div>
            )}
          </Link>
        </div>
      </div>
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} setAuthModal={setOpen} />
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Header;
