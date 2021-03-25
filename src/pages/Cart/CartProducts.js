import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart, saveForLater } from '../../axiosFunctions/cart';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';

const CartContent = ({ user, cart, savedForLater, calculate }) => {
  const dispatch = useDispatch();

  const update = (id, operation) => {
    let productsArray = [...cart.products];
    if (typeof window !== 'undefined') {
      productsArray.forEach((item, i) => {
        if (item._id === id) {
          let updatedItem;
          if (operation === 'add') {
            updatedItem = { ...item, count: item.count + 1 };
            productsArray.splice(i, 1, updatedItem);
          }
          if (operation === 'subtract') {
            updatedItem = { ...item, count: item.count - 1 };
            productsArray.splice(i, 1, updatedItem);
          }
          if (operation === 'remove') {
            productsArray.splice(i, 1);
          }
          if (operation === 'save') {
            save(item);
            productsArray.splice(i, 1);
          }
          let orderSummary = calculate(productsArray);
          if (user) {
            updateCart(user.token, user.email, operation, id)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          localStorage.setItem('localCart', JSON.stringify({ products: productsArray, ...orderSummary }));
          dispatch({
            type: 'ADD_TO_CART',
            payload: { products: productsArray, ...orderSummary },
          });
        }
      });
    }
  };
  const save = (item) => {
    let saved = [...savedForLater];
    saved.push(item);
    localStorage.setItem('savedForLater', JSON.stringify(saved));
    dispatch({
      type: 'SAVE_FOR_LATER',
      payload: saved,
    });
    if (user) {
      saveForLater(user.token, user.email, item)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.cart}>
      <header>My Cart</header>
      {cart.products.map((item, i) => (
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
              <Button click={() => update(item._id, 'add')}>+</Button>
              <div
                style={{
                  width: 'fit-content',
                  margin: '0 0.25rem',
                  padding: '0.5rem',
                  height: '100%',
                  border: '1px solid #ccc',
                }}>
                <b>{item.count.toString()}</b>
              </div>
              <Button click={() => update(item._id, 'subtract')} disabled={item.count === 0}>
                -
              </Button>
            </div>
            <div style={{ justifyContent: 'flex-end' }}>
              <Button click={() => update(item._id, 'save')}>Save for later</Button>
              <Button click={() => update(item._id, 'remove')}>Remove</Button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.checkout}>
        <Link to='/checkout'>
          <Button>Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartContent;
