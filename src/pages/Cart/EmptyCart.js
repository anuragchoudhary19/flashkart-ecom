import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';
import Modal from './../../components/Modal/Modal';

const EmptyCart = () => {
  const [isOpen, setIsOpen] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  const showLoginModal = () => {
    setIsOpen('login');
  };
  return (
    <div className={styles.emptyCart}>
      <h1>Cart seems to be Empty!</h1>
      <div className={styles.cartIcon}>
        <FontAwesomeIcon icon={faCartPlus} />
      </div>
      <div>
        {user && user.token ? (
          <Link to='/'>
            <Button>Build your Cart</Button>
          </Link>
        ) : (
          <Button click={showLoginModal}>Login to Build Your Cart</Button>
        )}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default EmptyCart;
