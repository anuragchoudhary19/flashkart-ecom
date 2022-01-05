import React, { useEffect, useState } from 'react';
import { cancelOrder, getUserOrders } from '../../axiosFunctions/user';
import { useSelector } from 'react-redux';
import Button from '../../components/Elements/Button/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { message } from 'antd';
import Invoice from './Invoice/Invoice';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [user.token]);
  const downloadInvoice = (order) => (
    <PDFDownloadLink document={<Invoice order={order} />} fileName='invoice.pdf'>
      <Button>Download Invoice</Button>
    </PDFDownloadLink>
  );

  const handleCancelOrder = (id) => {
    cancelOrder(user.token, id).then((res) => {
      message.success('Order Cancelled');
    });
  };
  if (loading) return null;
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <header>My Orders</header>
        {orders?.map((order) => (
          <div className={styles.order} key={order._id}>
            <header style={{ padding: '0.5rem' }}>
              <b>Order ID:{order._id}</b>
              <b>Date: {new Date(order.createdAt.split('T', 1)[0]).toLocaleDateString()}</b>
            </header>
            <div className={styles.orderItem}>
              <div className={styles.tableRow}>
                {order.products.map((item, i) => (
                  <div className={styles.product} key={i}>
                    <div>
                      <img alt='img' src={item?.product?.images[0]?.url} width='80px' height='120px' />
                    </div>
                    <div>
                      <label>Product</label>
                      <b>{item.product.title}</b>
                    </div>
                    <div>
                      <label>Quanity</label>
                      <b>{item.count}</b>
                    </div>
                    <div>
                      <label>Total Price</label>
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
                <div>
                  <label>Order Status</label>
                  <div>
                    <b>{order.orderStatus}</b>
                    {!['Cancelled', 'Delivered'].includes(order.orderStatus) && (
                      <b onClick={() => handleCancelOrder(order._id)} style={{ color: 'red', cursor: 'pointer' }}>
                        Cancel Order
                      </b>
                    )}
                  </div>
                </div>
                <div>
                  <label>Invoice</label>
                  <div>{downloadInvoice(order)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {orders?.length === 0 ? <div className={styles.noOrders}>No Orders Yet</div> : null}
      </div>
    </div>
  );
};

export default Orders;
