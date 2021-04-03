import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Elements/Button/Button';
import styles from './Checkout.module.css';
import CheckoutForm from './CheckoutForm';
import { currentUser } from '../../axiosFunctions/auth';
import { removeAddress } from '../../axiosFunctions/user';
import { emptyCart } from './../../axiosFunctions/cart';
import { Radio, Collapse, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState('');
  const { user, cart, savedForLater } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    orderSummary();
    return orderSummary;
  }, [cart, savedForLater]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    if (history.location.state?.from === '/cart') {
      currentUser(user.token).then((res) => {
        setAddresses(res.data.address);
        console.log(res);
      });
    } else {
      history.push('/');
    }
  };
  const orderSummary = () => {
    if (cart?.products) {
      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItems = 0;
      let products = cart.products;
      products.forEach((item) => {
        totalPrice += item.price;
        totalDiscountedPrice += item.price * (1 - item.discount / 100) * item.count;
        totalItems += 1;
      });
      setTotalPrice(totalPrice);
      setTotalDiscountedPrice(totalDiscountedPrice);
      setTotalItems(totalItems);
    }
  };
  const emptyCartHandle = () => {
    if (localStorage.getItem('cart')) {
      localStorage.setItem('cart', '');
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: null,
    });
    emptyCart(user.token).then((res) => {
      message.success('CART EMPTIED SUCCESSFULLY', 2);
      history.push('/');
    });
  };

  const deleteHandle = async (id) => {
    await removeAddress(user.token, id).then((res) => {
      if (res.data.deleted) {
        message.success('Deleted');
        getAddress();
      }
    });
  };
  const proceedToPayHandle = () => {
    history.push({ pathname: '/payment', state: { from: '/checkout' } });
  };
  return (
    <div className={styles.page}>
      <div className={styles.content}>
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
          <div>
            <div>Saved</div>
            <div>
              {(totalPrice - totalDiscountedPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </div>
          </div>
          <div className={styles.total}>
            <div>Total Price</div>
            <div>{totalDiscountedPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
          <div className={styles.controls}>
            <Button click={() => history.push('/')}>Shop More</Button>
            <Button click={emptyCartHandle}>Empty Cart</Button>
          </div>
        </div>
        <div className={styles.checkoutForm}>
          <div className={styles.addressOptions}>
            <header>Select Address</header>
            {addresses.length ? (
              <Radio.Group onChange={(e) => setAddress(e.target.value)}>
                {addresses.map((a) => (
                  <div className={styles.radio} key={a._id}>
                    <Radio value={a._id}>
                      <div>{a.name}</div>
                      <div>{a.address}</div>
                      <div>{a.city}</div>
                      <div>{a.state}</div>
                      <div>{a.pincode}</div>
                      <div>Contact : {a.mobile}</div>
                    </Radio>
                    <div>
                      <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => deleteHandle(a._id)} />
                    </div>
                  </div>
                ))}
              </Radio.Group>
            ) : (
              <div>No address</div>
            )}
          </div>
          <Collapse bordered>
            <Panel header='Add Address' key='2'>
              <CheckoutForm getAddress={getAddress} />
            </Panel>
          </Collapse>
          <div className={styles.paymentButton}>
            <Button disabled={address === ''} click={proceedToPayHandle}>
              {address !== '' ? 'Proceed to Pay' : 'Select Delivery Address'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
