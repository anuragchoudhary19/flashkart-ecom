import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../axiosFunctions/user';
import { useSelector } from 'react-redux';
import Button from '../../components/Elements/Button/Button';
import { updateOrderStatus } from '../../axiosFunctions/admin';
import styles from './Orders.module.css';
import { Select, message } from 'antd';
const { Option } = Select;

const OrdersByUsers = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const orderStatus = ['Not Processed', 'Processing', 'Dispatched', 'Cancelled', 'Delivered'];
  const [currentStatus, setCurrentStatus] = useState('');
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
      setLoading(false);
      console.log(res.data);
    });
  };
  const updateStatus = (orderId) => {
    if (currentStatus) {
      updateOrderStatus(user.token, orderId, currentStatus).then(() => {
        getOrders();
      });
      console.log(currentStatus);
    } else {
      message.error('Select Order Status');
    }
  };
  return (
    !loading && (
      <div className={styles.page}>
        <div className={styles.content}>
          <header>Placed Orders</header>
          {orders?.length &&
            orders.map((order) => (
              <>
                <div style={{ padding: '1rem' }}>
                  <b>Order ID:{order._id}</b>
                </div>
                <div className={styles.row}>
                  <div>Product</div>
                  <div>Quanity</div>
                  <div>Total Price</div>
                  <div>Order Status</div>
                </div>
                <div className={styles.order} key={order._id}>
                  <div className={styles.tableRow}>
                    {order.products.map((item, i) => (
                      <div className={styles.product} key={i}>
                        <div>
                          <img alt='img' src={item?.product?.images[0]?.url} width='150px' height='200px' />
                        </div>
                        <div>
                          <b>{item.product.title}</b>
                        </div>
                        <div>
                          <b>{item.count}</b>
                        </div>
                        <div>
                          <b>
                            {(order.paymentIntent.amount / 100).toLocaleString('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                            })}
                          </b>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Select defaultValue={order.orderStatus} onChange={(e) => setCurrentStatus(e)}>
                      {orderStatus.map((option, i) => (
                        <Option key={i} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                    <Button type='submit' click={() => updateStatus(order._id)}>
                      Update
                    </Button>
                  </div>
                </div>
              </>
            ))}
        </div>
        {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
      </div>
    )
  );
};

export default OrdersByUsers;
