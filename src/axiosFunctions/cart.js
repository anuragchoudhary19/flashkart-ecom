import axios from 'axios';

export const addToCart = async (authToken, cart) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const getCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};
export const removeFromCart = async (authToken, email, cart) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/removeFromCart`,
    { email, cart },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const emptyCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};
export const updateCart = async (authToken, email, operation, item_id, color) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/updateCart`,
    { email, operation, item_id, color },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const saveForLater = async (authToken, email, item) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/saveForLater`,
    { email, item },
    {
      headers: {
        authToken,
      },
    }
  );
};
