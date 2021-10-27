import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, getCartValue } from '../axiosFunctions/cart';

const addToCartLS = (cartType, cart) => {
  localStorage.setItem(cartType, JSON.stringify(cart));
};

const addToCartRS = (cart, dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: cart,
  });
};

export const useGetCart = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const token = useMemo(() => (user ? user.token : null), [user]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token !== null) {
      setLoading(true);
      getCart(token)
        .then((res) => {
          console.log(res);
          addToCartLS('cartOnDB', res.data);
          addToCartRS(res.data, dispatch);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cartLocal')) {
          let cart = JSON.parse(localStorage.getItem('cartLocal'));
          let products = cart.products?.map((p) => ({ _id: p.product._id, count: p.count }));
          getCartValue(products).then((res) => {
            if (res.data) {
              addToCartLS('cartLocal', res.data);
              addToCartRS(res.data, dispatch);
            }
          });
        }
      }
    }
  }, [token, dispatch]);

  return { loading };
};
