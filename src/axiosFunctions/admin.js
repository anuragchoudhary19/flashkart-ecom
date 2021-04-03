import axios from 'axios';

export const getOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authToken,
    },
  });
};

export const updateOrderStatus = async (authToken, orderId, orderStatus) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/order/status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
};
