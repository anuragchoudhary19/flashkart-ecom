import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart, saveForLater } from '../../axiosFunctions/cart';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';

const CartContent = ({ user, cart, savedForLater, setloading, calculate }) => {
  const dispatch = useDispatch();

  const update = (id, color, operation) => {
    let productsArray = [...cart.products];
    if (typeof window !== 'undefined') {
      productsArray.forEach((item, i) => {
        if (item._id === id && item.color === color) {
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
            updateCart(user.idToken, user.email, operation, id, color)
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
      saveForLater(user.idToken, user.email, item)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.table}>
      <header>My Cart</header>
      {cart.products.map((item, i) => (
        <div className={styles.tableRow} key={i}>
          <div className={styles.product}>
            <div>
              <img alt='img' src={item.images[0].url} width='150px' height='fit-content' />
            </div>
            <div>
              <b>
                {item.title} ({item.color})
              </b>
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
              <Button click={() => update(item._id, item.color, 'add')}>+</Button>
              <div style={{ width: 'fit-content', padding: '0.75rem', height: '100%', border: '1px solid #ccc' }}>
                <b>{item.count.toString()}</b>
              </div>
              <Button click={() => update(item._id, item.color, 'subtract')} disabled={item.count === 0}>
                -
              </Button>
            </div>
            <div style={{ justifyContent: 'flex-end' }}>
              <Button click={() => update(item._id, item.color, 'save')}>Save for later</Button>
              <Button click={() => update(item._id, item.color, 'remove')}>Remove</Button>
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
