import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Cart.module.css';
import { useSelector } from 'react-redux';
import { addToCart, updateCart, saveForLater } from '../../axiosFunctions/cart';
import Button from '../../components/Elements/Button/Button';
import _ from 'lodash';

const Saved = ({ calculate }) => {
  const { user, localCart, savedForLater } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const moveToCart = (id) => {
    let products = [...localCart.products];
    if (typeof window !== 'undefined') {
      savedForLater.forEach((item, i) => {
        if (item._id === id) {
          products.push(item);
          removeFromSave(id);
          let uniqueArray = _.uniqWith(products, _.isEqual);
          let orderSummary = calculate(uniqueArray);
          localStorage.setItem('localCart', JSON.stringify({ products: uniqueArray, ...orderSummary }));
          dispatch({
            type: 'ADD_TO_CART',
            payload: { products: uniqueArray, ...orderSummary },
          });
          if (user) {
            addToCart(user.token, user.email, uniqueArray)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    }
  };

  const removeFromSave = (id) => {
    let saved = [...savedForLater];
    if (typeof window !== 'undefined') {
      savedForLater.forEach((item, i) => {
        if (item._id === id) {
          saved.splice(i, 1);
          localStorage.setItem('savedForLater', JSON.stringify(saved));
          dispatch({
            type: 'SAVE_FOR_LATER',
            payload: saved,
          });
          if (user) {
            saveForLater(user.token, user.email, saved)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    }
  };

  return savedForLater.length ? (
    <div className={styles.cart}>
      <header>Saved For Later</header>
      {savedForLater.map((item, i) => (
        <div className={styles.tableRow} key={i}>
          <div className={styles.product}>
            <div>
              <img alt='img' src={item.images[0].url} width='150px' height='200px' />
            </div>
            <div>
              <b>{item.title}</b>
              <b>
                &#8377;
                {item.price * (1 - item.discount / 100) * item.count}
              </b>
              <span>
                <s>
                  &#8377;
                  {item.price * item.count}
                </s>
                <b style={{ marginLeft: '5px', color: 'green' }}>
                  {item.discount}
                  %off
                </b>
              </span>
            </div>
          </div>
          <div className={styles.controls}>
            <div>
              <Button disabled>+</Button>
              <div style={{ width: 'fit-content', padding: '0.5rem', height: '100%', border: '1px solid #ccc' }}>
                {item.count.toString()}
              </div>
              <Button disabled>-</Button>
            </div>
            <div style={{ justifyContent: 'flex-end' }}>
              <Button click={() => moveToCart(item._id)}>Move to Cart</Button>
              <Button click={() => removeFromSave(item._id)}>Remove</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Saved;
