import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Elements/Button/Button';
import styles from './Checkout.module.css';
import CheckoutForm from './CheckoutForm';
import { currentUser } from '../../axiosFunctions/auth';
import { addAddress } from './../../axiosFunctions/user';
import { Radio, Collapse } from 'antd';

const { Panel } = Collapse;

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState('');
  const { user, localCart, savedForLater } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  useEffect(() => {
    orderSummary();
    return orderSummary;
  }, [localCart, savedForLater]);

  useEffect(() => {
    currentUser(user.idToken).then((res) => {
      setAddresses(res.data.address);
      console.log(res);
    });
  }, []);

  const orderSummary = () => {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;
    let products = localCart.products;
    products.forEach((item) => {
      totalPrice += item.price;
      totalDiscountedPrice += item.price * (1 - item.discount / 100) * item.count;
      totalItems += 1;
    });
    setTotalPrice(totalPrice);
    setTotalDiscountedPrice(totalDiscountedPrice);
    setTotalItems(totalItems);
  };

  return (
    <div className={styles.checkout}>
      <div>
        <div className={styles.addressOptions}>
          <header>Select Address</header>
          <Radio.Group onChange={(e) => setAddress(e.target.value)}>
            {addresses.map((a) => (
              <div key={a._id}>
                <Radio value={a._id}>
                  <b>
                    {a.name + ', ' + a.address + ', ' + a.city + ', ' + a.state + ', ' + a.pincode + ', ' + a.mobile}
                  </b>
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <Collapse defaultActiveKey={['1']} bordered>
          <Panel header='Add Address' key='1'>
            <CheckoutForm />
          </Panel>
        </Collapse>
        <div className={styles.paymentButton}>
          <Button disabled={address === ''} click={() => history.push('/payment')}>
            Proceed to Pay
          </Button>
        </div>
      </div>
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
          <div>{totalDiscountedPrice}</div>
        </div>
        <div className={styles.paymentButton}>
          <Button>Empty Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
