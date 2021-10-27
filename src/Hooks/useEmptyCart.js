import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emptyCart } from '../axiosFunctions/cart';
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

export const useEmptyCart = () => {
  const [empty, setEmpty] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!empty) return;
    if (typeof window !== 'undefined') {
      if (user?.token) {
        emptyCart(user.token)
          .then((res) => {
            if (res.data.ok) {
              if (localStorage.getItem('cartOnDB')) {
                localStorage.removeItem('cartOnDB');
              }
              addToCartRS(null, dispatch);
              message.success('Emptied cart successfully');
              history.push('/cart');
            }
          })
          .catch((err) => {
            message.error('Add To Cart Failed');
          });
      } else {
        if (localStorage.getItem('cartLocal')) {
          localStorage.removeItem('cartLocal');
          history.push('/cart');
        }
      }
    }
    return () => {
      setEmpty(false);
    };
  }, [dispatch, history, empty, user?.token]);
  return { setEmpty };
};
