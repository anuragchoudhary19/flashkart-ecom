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
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { item, buy } = product;
    if (item === null) return;
    if (typeof window == 'undefined') return;
    if (user?.token) {
      const handleAddToCart = async () => {
        setLoading(true);
        try {
          const { data } = await addToCart(user.token, item._id);
          if (data.alreadyInCart && buy) {
            setLoading(false);
            history.push('/cart');
          } else if (data.alreadyInCart) {
            setLoading(false);
            message.success('Already in cart');
          } else {
            setLoading(false);
            addToCartLS('cartOnDB', data);
            addToCartRS(data, dispatch);
            setProduct(initialState);
            message.success('Added to cart successfully');
            if (buy) {
              history.push('/cart');
            }
          }
        } catch (error) {
          message.error('Add To Cart Failed');
        }
      };
      handleAddToCart();
    } else {
      let products = [];
      if (localStorage.getItem('cartLocal')) {
        let cart = JSON.parse(localStorage.getItem('cartLocal'));
        products = cart.products.map((p) => ({ _id: p.product._id, count: p.count }));
      }
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id.toString() === item?._id.toString()) {
          if (buy) {
            history.push('/cart');
          } else {
            message.success('Already in cart');
            setProduct(initialState);
          }
          return;
        }
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
        setProduct(initialState);
        if (buy) {
          history.push('/cart');
        }
      });
    }

    return () => {
      setProduct(initialState);
    };
  }, [product, user?.token, dispatch, history, initialState]);
  return [loading, setProduct];
};
