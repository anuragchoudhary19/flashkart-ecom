import axios from 'axios';

export const addToCart = async (authToken, id) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      id,
    },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const addAddressToCart = async (authToken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart/address`,
    {
      address,
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
export const getCartValue = async (items) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/cartValue`, { items });
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
