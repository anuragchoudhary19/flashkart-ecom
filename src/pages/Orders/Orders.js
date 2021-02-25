import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../axiosFunctions/user';
import { useSelector } from 'react-redux';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import styles from './Orders.module.css';
import Invoice from './Invoice/Invoice';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getUserOrders(user.idToken).then((res) => {
      setOrders(res.data);

      setLoading(false);
      console.log(res.data);
    });
  }, []);
  const downloadInvoice = (order) => (
    <PDFDownloadLink document={<Invoice order={order} />} fileName='invoice.pdf'>
      Download Invoice
    </PDFDownloadLink>
  );
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
                        <b>{order.orderStatus}</b>
                      </div>
                    </div>
                    <div>{downloadInvoice(order)}</div>
                  </div>
                ))}
              </>
            ))}
        </div>
        {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
      </div>
    )
  );
};

export default Orders;
