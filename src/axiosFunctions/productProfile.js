import axios from 'axios';

export const createProductProfile = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/productProfile`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProductProfilesByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/productProfiles/${count}`);
};

export const removeProductProfile = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/productProfile/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProductProfile = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/productProfile/${slug}`);
};
export const getProductProfilePrice = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/productProfile/price/${id}`);
};

export const updateProductProfile = async (slug, product, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/productProfile/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
};
export const addRating = async (id, rating, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/productProfiles/rating/${id}`,
    { rating },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const addReview = async (id, review, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/productProfiles/review/${id}`,
    { review },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getProfiles = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/productProfiles`, { sort, order, page });
};
export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
export const relatedProducts = async (brand, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/productProfiles/related-products`, { brand, page });
};
