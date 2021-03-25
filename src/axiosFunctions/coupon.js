import axios from 'axios';

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`);
};

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// export const getBrand = async (slug) => {
//   return await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`);
// };

export const removeCoupon = async (couponId, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCoupon = async (couponId, coupon, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};
