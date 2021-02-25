import axios from 'axios';

export const getBrands = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/brands`);
};
export const getBrandsProductProfile = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/brands-product-profile`);
};

export const createBrand = async (brand, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/brand`, brand, {
    headers: {
      authtoken,
    },
  });
};

export const getBrand = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`);
};

export const removeBrand = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/brand/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateBrand = async (slug, brand, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/brand/${slug}`, brand, {
    headers: {
      authtoken,
    },
  });
};

export const getBrandProducts = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/brand/products/${_id}`);
};
