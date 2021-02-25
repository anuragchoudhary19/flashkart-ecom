import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//components
import Login from '../../../pages/auth/Login/Login';
import Button from '../../Elements/Button/Button';
import Dropdown from './../../Dropdown/Dropdown';
//functions
import firebase from 'firebase';
//css
import classes from './Header.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

function Header() {
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
  const showAuthModal = () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: true,
    });
  };
  return (
    <div className={classes.navbar}>
      <NavLink to='/'>
        <div className={classes.home}>FlashKart</div>
      </NavLink>
      <div>
        {!user && (
          <div className={classes.authButtons}>
            <Button click={showAuthModal}>Log In</Button>
            <Button click={showAuthModal}>Sign Up</Button>
          </div>
        )}
        {user && (
          <div className={classes.dropdown}>
            <div className={classes.avatar}>
              <Avatar
                shape='square'
                style={{ color: '#21209c', backgroundColor: '#fdb827', textAlign: 'center', fontWeight: '900' }}>
                {user.email[0].toUpperCase()}
              </Avatar>
            </div>
            <Dropdown>
              <div className={classes.options}>
                <div>{user && user.role === 'admin' && <Link to='/admin/dashboard'>DashBoard</Link>}</div>
                <div>
                  {user && user.role === 'subscriber' && <Link to='/user/orders'>Orders</Link>}
                  {user && user.role === 'admin' && <Link to='/admin/orders'>Orders</Link>}
                </div>
                <div>{user && user.role === 'subscriber' && <Link to='/user/wishlist'>Wishlist</Link>}</div>

                <div>
                  <Link to='/admin/profile'>Profile</Link>
                </div>
                <div onClick={logout}>
                  <div>Logout</div>
                </div>
              </div>
            </Dropdown>
          </div>
        )}
        <div className={classes.cart}>
          <Link to={'/cart'}>
            <Badge count={localCart.products && localCart.products.length}>
              <ShoppingCartOutlined style={{ color: '#f1f1f1', fontSize: '2rem' }} />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
