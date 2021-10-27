import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartValue, updateCart } from '../axiosFunctions/cart';

const addToCartLS = (cartType, cart) => {
  localStorage.setItem(cartType, JSON.stringify(cart));
};
const addToCartRS = (cart, dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: cart,
  });
};

const updateHandle = (cart, id, operation, dispatch) => {
  if (typeof window !== 'undefined') {
    cart.products.forEach((p, i) => {
      if (p.product._id === id) {
        if (operation === 'add') {
          p.count += 1;
        }
        if (operation === 'subtract') {
          p.count -= 1;
          if (p.count === 0) {
            cart.products.splice(i, 1);
          }
        }
        if (operation === 'remove') {
          cart.products.splice(i, 1);
        }
      }
    });
  }
  let products = cart.products.map((p) => ({ _id: p.product._id, count: p.count }));
  return products;
};

export const useUpdateCart = () => {
  const initialState = useMemo(
    () => ({
      id: '',
      operation: '',
    }),
    []
  );
  const [update, setUpdate] = useState('');
  const { id, operation } = update;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (id && operation) {
      if (user?.token) {
        updateCart(user.token, operation, id)
          .then((res) => {
            addToCartLS('cartOnDB', res.data);
            addToCartRS(res.data, dispatch);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (typeof window !== 'undefined') {
          if (localStorage.getItem('cartLocal')) {
            let cart = JSON.parse(localStorage.getItem('cartLocal'));
            if (cart.products.length > 0) {
              const updatedProducts = updateHandle(cart, id, operation, dispatch);
              getCartValue(updatedProducts).then((res) => {
                addToCartLS('cartLocal', res.data);
                addToCartRS(res.data, dispatch);
              });
            }
          }
        }
      }
    }
    return () => {
      setUpdate(initialState);
    };
  }, [dispatch, id, operation, user?.token, initialState]);
  return { setUpdate };
};
