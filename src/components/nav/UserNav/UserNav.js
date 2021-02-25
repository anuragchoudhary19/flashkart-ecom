import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Usernav.module.css';

function UserNav() {
  return (
    <nav className={classes.Usernav}>
      <ul>
        <li>
          <Link to='/user/account'>Account</Link>
        </li>
        <li>
          <Link to='/user/password'>Password</Link>
        </li>
        <li>
          <Link to='/user/wishlist'>Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
