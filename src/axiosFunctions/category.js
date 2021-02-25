import axios from 'axios';

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, brand, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, brand, {
    headers: {
      authtoken,
    },
  });
};

export const createCategory = async (brand, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/category`, brand, {
    headers: {
      authtoken,
    },
  });
};

export const getCategoryBrands = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/brands/${_id}`);
};
