import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { updateCart, saveForLater } from '../../axiosFunctions/cart';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';
import { message } from 'antd';
const CartContent = ({ user, cart, savedForLater, cartSummary, setLoading }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const update = (id, operation) => {
    setLoading(true);
    let products = [...cart.products];
    if (typeof window !== 'undefined') {
      products.forEach((item, i) => {
        let updatedProduct;
        if (item._id === id) {
          if (operation === 'add') {
            updatedProduct = { ...item, count: item.count + 1 };
            products.splice(i, 1, updatedProduct);
          }
          if (operation === 'subtract') {
            updatedProduct = { ...item, count: item.count - 1 };
            products.splice(i, 1, updatedProduct);
          }
          if (operation === 'remove') {
            products.splice(i, 1);
          }
          if (operation === 'save') {
            save(item);
            products.splice(i, 1);
          }
          if (user?.token) {
            updateCart(user.token, operation, id)
              .then((res) => {
                let orderSummary = cartSummary(products);
                localStorage.setItem('cart', JSON.stringify({ products: products, ...orderSummary }));
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: { products: products, ...orderSummary },
                });
                if (res.data) {
                  message.success('Cart Updated');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            let orderSummary = cartSummary(products);
            localStorage.setItem('cart', JSON.stringify({ products: products, ...orderSummary }));
            dispatch({
              type: 'ADD_TO_CART',
              payload: { products: products, ...orderSummary },
            });
          }
        }
      });
    }
    setLoading(false);
  };
  const save = (item) => {
    setLoading(true);
    let saved = [...savedForLater];
    saved.push(item);
    let uniqueArray = _.uniqWith(saved, _.isEqual);
    localStorage.setItem('savedForLater', JSON.stringify(uniqueArray));
    dispatch({
      type: 'SAVE_FOR_LATER',
      payload: saved,
    });
    if (user?.token) {
      saveForLater(user.token, saved)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  };
  const checkoutHandle = () => {
    if (user?.token) {
      history.push('/checkout');
    } else {
      history.push({ state: { from: '/cart' } });
      dispatch({
        type: 'SHOW_LOGIN_MODAL',
        payload: { showLoginModal: true },
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
              <Link exact to={`product/${item.slug}`}>
                <img alt='img' src={item.images[0].url} width='150px' height='200px' />
              </Link>
            </div>
            <div>
              <b>{item.title}</b>
              <b>
                {(item.price * (1 - item.discount / 100) * item.count).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </b>
              <span>
                <s>{(item.price * item.count).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</s>
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
        <Button click={checkoutHandle}>{user?.token ? 'Checkout' : 'Login to Checkout'}</Button>
      </div>
    </div>
  );
};

export default CartContent;
