import axios from 'axios';

export const addToCart = async (authToken, products) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      products,
    },
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

export const emptyCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};
export const updateCart = async (authToken, operation, id) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/updateCart`,
    {
      operation,
      id,
    },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const saveForLater = async (authToken, saved) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/saveForLater`,
    {
      saved,
    },
    {
      headers: {
        authToken,
      },
    }
  );
};
