import React, { useEffect, useState } from 'react';
import { getOrders, changeOrderStatus } from '../../../axiosFunctions/admin';
import { useSelector } from 'react-redux';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import styles from './Orders.module.css';
import { Select } from 'antd';
const { Option } = Select;
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [status, setStatus] = useState(['Not Processed', 'Processing', 'Dispatched', 'Cancelled', 'Delivered']);
  useEffect(() => {
    loadOrders();
    return loadOrders;
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getOrders(user.idToken).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      setLoading(false);
    });
  };
  const handleOrderStatus = (id, status) => {
    console.log(status);
    changeOrderStatus(user.idToken, id, status).then((res) => {
      setOrders(res.data);
      loadOrders();
      console.log(res.data);
    });
  };
  return (
    !loading && (
      <div className={styles.ordersPage}>
        <div className={styles.orders}>
          <header>My Orders</header>
          {orders.length &&
            orders.map((order) => (
              <>
                {order.products.map((item, i) => (
                  <div className={styles.tableRow} key={i}>
                    <div className={styles.product}>
                      <div>
                        <div>
                          <img alt='img' src={item.product.images[0].url} width='150px' height='fit-content' />
                        </div>
                        <div>
                          <b>{item.product.title}</b>
                          <span>Color:{item.color}</span>
                        </div>
                      </div>
                      <div style={{ alignItems: 'center', alignSelf: 'right' }}>
                        <b>
                          {order.paymentIntent.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </b>
                      </div>
                      <div style={{ alignItems: 'center', alignSelf: 'right' }}>
                        <Select
                          defaultValue={order.orderStatus}
                          style={{ width: 'auto', minWidth: '120px' }}
                          onChange={(e) => handleOrderStatus(order._id, e)}>
                          {status.map((c) => (
                            <Option title='orderStatus' key={c} value={c}>
                              {c}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ))}
        </div>
      </div>
    )
  );
};

export default Orders;
