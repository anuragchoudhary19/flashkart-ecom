import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { addToCart, getCartValue } from '../axiosFunctions/cart';
import { message } from 'antd';
import { useLocalStorage } from './useLocalStorage';
import { useReduxStore } from './useReduxStore';

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
  const [addToLocalStorage] = useLocalStorage();
  const [addToReduxStore] = useReduxStore();
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
            addToLocalStorage('cartOnDB', data);
            addToReduxStore('ADD_TO_CART', data);
            setProduct(initialState);
            message.success('Added to cart successfully');
            if (buy) history.push('/cart');
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
        addToLocalStorage('cartLocal', res.data);
        addToReduxStore('ADD_TO_CART', res.data);
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
  }, [product, addToLocalStorage, addToReduxStore, user?.token, history, initialState]);
  return [loading, setProduct];
};
