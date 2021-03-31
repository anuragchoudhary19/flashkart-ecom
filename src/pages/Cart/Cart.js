import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CartProducts from './CartProducts';
import EmptyCart from './EmptyCart';
import Saved from './SavedForLater';

import { getCart } from '../../axiosFunctions/cart';
import styles from './Cart.module.css';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user, cart, savedForLater } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    let products = [];
    let orderSummary;
    if (user?.token) {
      getCart(user.token).then((res) => {
        let uniqueProducts = [];
        if (res.data) {
          res.data.products.forEach((item) => {
            products.push({ ...item.product, count: item.count });
          });
          uniqueProducts = _.uniqWith(products, _.isEqual);
          orderSummary = cartSummary(uniqueProducts);
          if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify({ products: uniqueProducts, ...orderSummary }));
          }
          dispatch({
            type: 'ADD_TO_CART',
            payload: { products: uniqueProducts, ...orderSummary },
          });
        }
      });
    } else {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
          let cart = JSON.parse(localStorage.getItem('cart'));
          products = cart.products;
        }
        orderSummary = cartSummary(products);
        localStorage.setItem('cart', JSON.stringify({ products, ...orderSummary }));
        dispatch({
          type: 'ADD_TO_CART',
          payload: { products, ...orderSummary },
        });
      }
    }
  }, [loading]);

  const cartSummary = (products) => {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;
    products.forEach((item) => {
      totalPrice += item.price;
      totalDiscountedPrice += item.price * (1 - item.discount / 100) * item.count;
      totalItems += 1;
    });
    setTotalPrice(totalPrice);
    setTotalDiscountedPrice(totalDiscountedPrice);
    setTotalItems(totalItems);
    return { totalPrice, totalDiscountedPrice, totalItems };
  };

  return (
    <div className={styles.page}>
      {cart?.products?.length ? (
        <div className={styles.content}>
          <CartProducts
            cart={cart}
            user={user}
            savedForLater={savedForLater}
            cartSummary={cartSummary}
            setLoading={setLoading}
          />
          <div className={styles.orderSummary}>
            <header>Order Summary</header>
            <div>
              <div>Total Items</div>
              <div>{totalItems}</div>
            </div>
            <div>
              <div>Price</div>
              <div>{totalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
            </div>
            <div>
              <div>Discount</div>
              <div style={{ color: 'green' }}>
                {(totalPrice - totalDiscountedPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </div>
            </div>
            <div>
              <div>Delivery Charges</div>
              <div style={{ color: 'green' }}>
                {(totalItems * 10).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </div>
            </div>
            <div className={styles.total}>
              <div>Total Price</div>
              <div>
                {(totalDiscountedPrice + totalItems * 10).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyCart user={user} />
        </div>
      )}
      {savedForLater?.length ? (
        <div className={styles.saved}>
          <Saved setLoading={setLoading} />
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
