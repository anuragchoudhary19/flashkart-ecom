import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={classes.Sidebar}>
      <ul>
        <NavLink to='/admin/dashboard' activeClassName={classes.selected}>
          <li>Dashboard</li>
        </NavLink>
        {/* <NavLink to='/admin/category' activeClassName={classes.selected}>
          <li>Create Category</li>
        </NavLink> */}
        <NavLink to='/admin/brand' activeClassName={classes.selected}>
          <li>Create Brand</li>
        </NavLink>
        <NavLink to='/admin/product' activeClassName={classes.selected}>
          <li>Create Product </li>
        </NavLink>
        <NavLink to='/admin/product-profile' activeClassName={classes.selected}>
          <li>Add Product Profile</li>
        </NavLink>
        <NavLink to='/admin/products' activeClassName={classes.selected}>
          <li>Show Products</li>
        </NavLink>
        <NavLink to='/admin/coupon' activeClassName={classes.selected}>
          <li>Create Coupon</li>
        </NavLink>
        <NavLink to='/user/password' activeClassName={classes.selected}>
          <li>Update Password</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
