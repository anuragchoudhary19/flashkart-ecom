import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import CartProduct from './CartProducts';
import EmptyCart from './EmptyCart';

import { useGetCart } from '../../Hooks/useGetCart';
import styles from './Cart.module.css';

const Cart = () => {
  const { loading } = useGetCart();
  const { user, cart, savedForLater } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.page}>
      {cart !== null && cart?.products?.length > 0 ? (
        <div className={styles.content}>
          <CartProduct products={cart?.products} user={user} savedForLater={savedForLater} loading={loading} />
          <div className={styles.orderSummary}>
            <header>Order Summary</header>
            <span>
              <span>Total Items</span>
              <span>{cart.products.length}</span>
            </span>
            <span>
              <span>Price</span>
              <span>{cart.cartTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </span>
            <span>
              <span>Discount</span>
              <span style={{ color: 'green' }}>
                {(cart.cartTotal - cart.cartTotalAfterDiscount).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </span>
            </span>
            <span>
              <span>Delivery Charges</span>
              <span style={{ color: 'green' }}>
                {/* {(cart.cartTotal * 10).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} */}
              </span>
            </span>
            <span className={styles.total}>
              <span>Total Price</span>
              <span>
                {cart.cartTotalAfterDiscount.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default Cart;
