import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Elements/Button/Button';
import styles from './Checkout.module.css';
import AddAddress from './AddAddress';
import { removeAddress, getAddress } from '../../axiosFunctions/user';
import { emptyCart, addAddressToCart } from './../../axiosFunctions/cart';
import { useEmptyCart } from './../../Hooks/useEmptyCart';
import { Radio, Collapse, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const Checkout = () => {
  const [id, setId] = useState('');
  const [addresses, setAddresses] = useState([]);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const { setEmpty } = useEmptyCart();
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    if (cart === null || cart.products.length === 0) {
      history.push('/cart');
    }
  }, [cart, history]);
  const getAddressFromDB = useCallback(() => {
    getAddress(user.token).then((res) => {
      console.log(res.data.address);
      setAddresses(res.data.address);
    });
  }, [user.token]);
  useEffect(() => {
    getAddressFromDB();
  }, [getAddressFromDB]);

  const emptyCartHandle = () => {
    setEmpty(true);
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
    if (id === '') {
      message.error('Select an address');
      return;
    }
    let addressForm = addresses.find((a) => a._id === id && a);
    addAddressToCart(user.token, addressForm).then((res) => {
      if (res.data.ok) {
        history.push({ pathname: '/payment', state: { from: '/checkout' } });
      }
    });
  };
  if (cart === null) return null;
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.orderSummary}>
          <header>Order Summary</header>
          <div>
            <div>Total Items</div>
            <div>{cart.products.length}</div>
          </div>
          <div>
            <div>Price</div>
            <div>{cart.cartTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
          <div>
            <div>Discount</div>
            <div style={{ color: 'green' }}>
              {(cart.cartTotal - cart.cartTotalAfterDiscount).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })}
            </div>
          </div>
          <div>
            <div>Delivery Charges</div>
            <div style={{ color: 'green' }}>
              {/* {(totalItems * 10).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} */}
            </div>
          </div>
          <div>
            <div>Saved</div>
            <div>
              {(cart.cartTotal - cart.cartTotalAfterDiscount).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })}
            </div>
          </div>
          <div className={styles.total}>
            <div>Total Price</div>
            <div>{cart.cartTotalAfterDiscount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
          <div className={styles.controls}>
            <Button style={{ height: '50%', padding: '.5rem' }} click={() => history.push('/')}>
              Shop More
            </Button>
            <Button style={{ height: '50%', padding: '.5rem' }} click={emptyCartHandle}>
              Empty Cart
            </Button>
          </div>
        </div>
        <div className={styles.checkoutForm}>
          <div className={styles.addressOptions}>
            <header>Address</header>
            <div>
              {addresses?.length ? (
                <Radio.Group onChange={(e) => setId(e.target.value)}>
                  {addresses.map((a) => (
                    <Collapse bordered key={a._id}>
                      <Panel header={`${a.name}`} key='1'>
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
                            <DeleteOutlined
                              style={{ fontSize: '20px', color: 'red' }}
                              onClick={() => deleteHandle(a._id)}
                            />
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  ))}
                </Radio.Group>
              ) : (
                <div>No address</div>
              )}
            </div>
          </div>
          <Collapse bordered>
            <Panel header='Add Address' key='1'>
              <AddAddress getAddress={getAddress} />
            </Panel>
          </Collapse>
          <div className={styles.paymentButton}>
            <Button disabled={id === ''} click={proceedToPayHandle}>
              {id !== '' ? 'Proceed to Pay' : 'Select Delivery Address'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
