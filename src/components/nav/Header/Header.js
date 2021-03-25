import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//components
import Button from '../../Elements/Button/Button';
import Dropdown from './../../Dropdown/Dropdown';
import Search from '../../Search/Search';
//functions
import firebase from 'firebase';
//css
import classes from './Header.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Header() {
  const [dropdown, setDropdown] = useState(false);
  let { user, localCart } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    window.localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/');
  };
  const showLoginAuthModal = () => {
    dispatch({
      type: 'SHOW_LOGIN_MODAL',
      payload: { showLoginModal: true },
    });
  };
  const showSignupAuthModal = () => {
    dispatch({
      type: 'SHOW_SIGNUP_MODAL',
      payload: { showSignupModal: true },
    });
  };
  return (
    <div className={classes.header}>
      <div className={classes.home}>
        <NavLink to='/'>FlashKart</NavLink>
      </div>
      <div>
        <Search />
        {!user && (
          <div className={classes.actions}>
            <Button click={showLoginAuthModal}>Log In</Button>
            <Button click={showSignupAuthModal}>Sign Up</Button>
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
                style={{ color: '#ffb703', backgroundColor: '#023047', textAlign: 'center', fontWeight: 'bold' }}
              />
            </div>
            <Dropdown dropdown={dropdown}>
              {user && user.role === 'admin' && <Link to='/admin/brand'>Dashboard</Link>}
              {user && user.role === 'admin' && <Link to='/admin/orders'>User Orders</Link>}
              {user && user.role === 'subscriber' && <Link to='/user/orders'>Orders</Link>}
              {user && user.role === 'subscriber' && <Link to='/user/wishlist'>Wishlist</Link>}
              <Link to='/admin/profile'>Profile</Link>
              <div onClick={logout}>
                <div>Logout</div>
              </div>
            </Dropdown>
          </div>
        )}
        <div className={classes.cart}>
          <Link to={'/cart'}>
            <Badge
              count={localCart.products && localCart.products.length}
              style={{ backgroundColor: '#ffb703', color: '#023047' }}>
              <ShoppingCartOutlined style={{ color: '#ffb703', fontSize: '2rem' }} />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
