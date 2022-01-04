import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';
import Modal from '../auth/Modal/Modal';

const EmptyCart = () => {
  const [open, setOpen] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  const showLoginModal = () => {
    setOpen('login');
  };
  return (
    <div className={styles.emptyCart}>
      <h1>Cart seems to be Empty!</h1>
      <div className={styles.cartIcon}>
        <FontAwesomeIcon icon={faCartPlus} />
      </div>
      <div>
        {user?.token ? (
          <Link to='/'>
            <Button>ADD ITEMS TO THE CART</Button>
          </Link>
        ) : (
          <Button click={showLoginModal}>Login to Build Your Cart</Button>
        )}
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default EmptyCart;
