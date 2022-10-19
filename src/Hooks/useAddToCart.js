import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addToLocalStorage] = useLocalStorage();
  const [addToReduxStore] = useReduxStore();
  const { user } = useSelector((state) => ({ ...state }));
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
          setData(data);
          setProduct(initialState);
          setLoading(false);
        } catch (error) {
          message.error('Add To Cart Failed');
        }
      };
      handleAddToCart();
    } else {
      let products = [];
      if (localStorage.getItem('cartLocal')) {
        let cart = JSON.parse(localStorage.getItem('cartLocal'));
        console.log(cart);
        products = cart?.products?.map((p) => ({ _id: p.product._id, count: p.count }));
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
        setData(res.data);
        message.success('Added to cart successfully');
        setProduct(initialState);
      });
    }
    return () => {
      setProduct(initialState);
    };
  }, [product, user?.token, history, initialState]);
  useEffect(() => {
    if (!data) return;
    if (user?.token) {
      if (data?.alreadyInCart && product?.buy) {
        history.push('/cart');
      } else if (data.alreadyInCart) {
        message.success('Already in cart');
      } else {
        addToLocalStorage('cartOnDB', data);
        addToReduxStore('ADD_TO_CART', data);
        message.success('Added to cart successfully');
        if (product?.buy) history.push('/cart');
      }
    } else {
      addToLocalStorage('cartLocal', data);
      addToReduxStore('ADD_TO_CART', data);
      if (product?.buy) {
        history.push('/cart');
      }
    }
    return () => {
      setData(null);
    };
  }, [addToLocalStorage, addToReduxStore, data, product?.buy, user?.token, history]);
  return [loading, setProduct];
};
