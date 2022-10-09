import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from './CartProducts.js';
import EmptyCart from './EmptyCart.js';

import { useGetCart } from '../../Hooks/useGetCart';
import styles from './Cart.module.css';

const Cart = () => {
  const { loading } = useGetCart();
  const { user, cart, savedForLater } = useSelector((state) => ({ ...state }));
  // console.log(cart);
  if (cart === null || cart?.products?.length === 0)
    return (
      <div className={styles.page}>
        <EmptyCart />
      </div>
    );
  return (
    <div className={styles.page}>
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
    </div>
  );
};

export default Cart;
