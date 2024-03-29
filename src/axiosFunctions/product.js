import axios from 'axios';

export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products`);
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
};
export const addRating = async (id, star, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/product/rating/${id}`, star, {
    headers: {
      authtoken,
    },
  });
};

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};
