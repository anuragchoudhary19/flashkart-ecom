import axios from 'axios';

export const addAddress = async (authToken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const removeAddress = async (authToken, id) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/address/${id}`, {
    headers: {
      authToken,
    },
  });
};

export const createOrder = async (authToken, stripeResponse) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const getUserOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/order`, {
    headers: {
      authToken,
    },
  });
};

export const addToWishlist = async (authToken, productId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const getWishlist = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authToken,
    },
  });
};
export const removeFromWishlist = async (authToken, productId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};
