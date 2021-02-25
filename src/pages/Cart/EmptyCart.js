import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';

const EmptyCart = ({ user }) => {
  let dispatch = useDispatch();

  const showAuthModal = () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: true,
    });
  };
  return (
    <div className={styles.emptyCart}>
      <div className={styles.cartIcon}>
        <FontAwesomeIcon icon={faCartPlus} />
      </div>
      <div>Cart seems to be Empty!</div>
      <div>
        {user && user.idToken ? (
          <NavLink exact to='/'>
            <Button>Start Building Your Cart Here...</Button>
          </NavLink>
        ) : (
          <Button click={showAuthModal}>Login to Add to Cart</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyCart;
