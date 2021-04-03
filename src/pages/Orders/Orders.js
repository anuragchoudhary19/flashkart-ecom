import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../axiosFunctions/user';
import { useSelector } from 'react-redux';
import Button from '../../components/Elements/Button/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styles from './Orders.module.css';
import Invoice from './Invoice/Invoice';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);

      setLoading(false);
      console.log(res.data);
    });
  }, []);
  const downloadInvoice = (order) => {
    console.log(order);
    return (
      <PDFDownloadLink document={<Invoice order={order} />} fileName='invoice.pdf'>
        <Button>Download Invoice</Button>
      </PDFDownloadLink>
    );
  };
  const cancelOrder = () => {
    //
  };
  return (
    !loading && (
      <div className={styles.page}>
        <div className={styles.content}>
          <header>Placed Orders</header>
          {orders?.map((order) => (
            <>
              <div style={{ padding: '1rem' }}>
                <b>Order ID:{order._id}</b>
              </div>
              <div className={styles.order} key={order._id}>
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
                      {order.orderStatus !== 'Delivered' ? (
                        <b onClick={() => cancelOrder(order._id)} style={{ color: 'red', cursor: 'pointer' }}>
                          Cancel Order
                        </b>
                      ) : (
                        <b>Return?</b>
                      )}
                    </div>
                  </div>
                  <div>
                    <label>Invoice</label>
                    <div>{downloadInvoice(order)}</div>
                  </div>
                </div>
              </div>
            </>
          ))}
          {orders?.length === 0 ? <div className={styles.noOrders}>No Orders Yet</div> : null}
        </div>
        {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
      </div>
    )
  );
};

export default Orders;
