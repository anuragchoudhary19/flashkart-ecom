import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <ul>
        <NavLink to='/admin/brand' activeClassName={classes.selected}>
          <li>Create Brand</li>
        </NavLink>
        <NavLink to='/admin/product' activeClassName={classes.selected}>
          <li>Create Product </li>
        </NavLink>
        <NavLink to='/admin/product-profile' activeClassName={classes.selected}>
          <li>Add Product Profile</li>
        </NavLink>
        {/* <NavLink to='/admin/product-profile-variant' activeClassName={classes.selected}>
          <li>Add Product Profile Variant</li>
        </NavLink> */}
        <NavLink to='/admin/products' activeClassName={classes.selected}>
          <li>Show Products</li>
        </NavLink>
        <NavLink to='/admin/coupon' activeClassName={classes.selected}>
          <li>Create Coupon</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
