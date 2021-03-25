import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

  const { user, localCart, savedForLater } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      getCart(user.token).then((res) => {
        console.log(res.data);
        let products = [];
        if (res.data) {
          res.data.products.forEach((item) => {
            products.push({ ...item.product, count: item.count });
          });
        }
        let orderSummary = calculate(products);
        if (typeof window !== 'undefined') {
          localStorage.setItem('localCart', JSON.stringify({ products: products, ...orderSummary }));
        }
        dispatch({
          type: 'ADD_TO_CART',
          payload: { products: products, ...orderSummary },
        });
      });
    }
  }, [loading, user]);

  const calculate = (products) => {
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
      {localCart.products && localCart.products.length ? (
        <div className={styles.content}>
          <CartProducts
            cart={localCart}
            user={user}
            savedForLater={savedForLater}
            setloading={setLoading}
            calculate={calculate}
          />
          <div className={styles.orderSummary}>
            <header>Order Summary</header>
            <div>
              <div>Total Items</div>
              <div>{totalItems}</div>
            </div>
            <div>
              <div>Price</div>
              <div>&#8377; {totalPrice}</div>
            </div>
            <div>
              <div>Discount</div>
              <div style={{ color: 'green' }}>-&#8377;{totalPrice - totalDiscountedPrice}</div>
            </div>
            <div>
              <div>Delivery Charges</div>
              <div style={{ color: 'green' }}>&#x20b9;0</div>
            </div>
            <div>
              <div>Saved</div>
              <div>18000</div>
            </div>
            <div className={styles.total}>
              <div>Total Price</div>
              <div>Rs {totalDiscountedPrice.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyCart user={user} />
        </div>
      )}
      {savedForLater.length ? (
        <div className={styles.saved}>
          <Saved calculate={calculate} />
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
