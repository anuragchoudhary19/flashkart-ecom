import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { addToCart, getCartValue } from '../axiosFunctions/cart';
import { message } from 'antd';

const addToCartLS = (cartType, cart) => {
  localStorage.setItem(cartType, JSON.stringify(cart));
};

const addToCartRS = (cart, dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: cart,
  });
};

export const useAddToCart = () => {
  const initialState = useMemo(
    () => ({
      item: null,
      buy: false,
    }),
    []
  );
  const [addToCartItem, setAddToCartItem] = useState(initialState);
  const { item, buy } = addToCartItem;
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!item?._id) return;
    let products = [];
    if (typeof window !== 'undefined') {
      if (user?.token) {
        addToCart(user.token, item._id)
          .then((res) => {
            addToCartLS('cartOnDB', res.data);
            addToCartRS(res.data, dispatch);
            message.success('Added to cart successfully');
            if (buy) {
              history.push('/cart');
            }
          })
          .catch((err) => {
            message.error('Add To Cart Failed');
          });
      } else {
        if (localStorage.getItem('cartLocal')) {
          let cart = JSON.parse(localStorage.getItem('cartLocal'));
          products = cart.products.map((p) => ({ _id: p.product._id, count: p.count }));
        }
        products.push({
          _id: item._id,
          count: 1,
        });
        let uniqueProducts = _.uniqWith(products, _.isEqual);
        getCartValue(uniqueProducts).then((res) => {
          addToCartLS('cartLocal', res.data);
          addToCartRS(res.data, dispatch);
          message.success('Added to cart successfully');
          if (buy) {
            history.push('/cart');
          }
        });
      }
    }
    return () => {
      setAddToCartItem(initialState);
    };
  }, [item, user?.token, dispatch, history, buy, initialState]);
  return { setAddToCartItem };
};
