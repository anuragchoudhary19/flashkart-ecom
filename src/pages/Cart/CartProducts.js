import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUpdateCart } from '../../Hooks/useUpdateCart';
import Button from '../../components/Elements/Button/Button';
import styles from './Cart.module.css';
import Modal from './../../components/Modal/Modal';

const CartProducts = ({ products, user }) => {
  const [isOpen, setIsOpen] = useState('');
  const { setUpdate } = useUpdateCart(products);
  let history = useHistory();

  const updateHandle = (id, operation) => {
    setUpdate({ id: id, operation: operation });
  };

  const checkoutHandle = () => {
    if (user?.token) {
      history.push({ pathname: '/checkout', state: { from: '/cart' } });
    } else {
      history.push({ state: { from: '/cart' } });
      setIsOpen('login');
    }
  };

  if (products?.length === 0) return null;
  return (
    <div className={styles.cart}>
      <header>My Cart</header>
      {products?.map((item, i) => (
        <div className={styles.item} key={item.product._id}>
          <Link to={`/product/${item.product.slug}`}>
            <div className={styles.product}>
              <img alt='img' src={item?.product.images[0].url} width='100px' height='100%' />
              <div>
                <h5>
                  <b>{item.product.title}</b>
                </h5>
                <h5>
                  <b>
                    {(item.product.price * (1 - item.product.discount / 100) * item.count).toLocaleString('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </b>
                </h5>
                <span>
                  <s>{item.product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</s>
                  <b style={{ marginLeft: '5px', color: 'green' }}>
                    {item.product.discount}
                    %off
                  </b>
                </span>
              </div>
            </div>
          </Link>
          <div className={styles.controls}>
            <div>
              <Button style={{ width: '30px' }} click={() => updateHandle(item.product._id, 'add')}>
                +
              </Button>
              <span
                style={{
                  width: 'fit-content',
                  margin: '0 0.25rem',
                  padding: '0.5rem',
                  height: '100%',
                  border: '1px solid #ccc',
                }}>
                <b>{item.count.toString()}</b>
              </span>
              <Button
                style={{ width: '30px' }}
                click={() => updateHandle(item.product._id, 'subtract')}
                disabled={item.count === 0}>
                -
              </Button>
            </div>
            <div>
              <Button style={{ width: '50%' }} click={() => updateHandle(item.product._id, 'remove')}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.checkout}>
        <Button style={{ width: 'fit-content', fontSize: '1.4rem' }} click={checkoutHandle}>
          {user?.token ? 'Checkout' : 'Login to Checkout'}
        </Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CartProducts;
