import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';

const EmptyCart = ({ user }) => {
  let dispatch = useDispatch();

  const showAuthModal = () => {
    dispatch({
      type: 'SHOW_LOGIN_MODAL',
      payload: { showLoginModal: true },
    });
  };
  return (
    <div className={styles.emptyCart}>
      <h1>Cart seems to be Empty!</h1>
      <div className={styles.cartIcon}>
        <FontAwesomeIcon icon={faCartPlus} />
      </div>
      <div>
        {user && user.token ? (
          <Link exact to='/'>
            <Button>Build your Cart</Button>
          </Link>
        ) : (
          <Button click={showAuthModal}>Login to Build Your Cart</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyCart;
