import React from 'react';
import UserNav from '../../components/nav/UserNav/UserNav';
import classes from './User.module.css';

function Wishlist() {
  return (
    <div className={classes.Usernav}>
      <div>
        <UserNav />
      </div>
      <h1>User Wishlist</h1>
    </div>
  );
}
export default Wishlist;
