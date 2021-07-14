import _ from 'lodash';
import { addToCart } from '../axiosFunctions/cart';
import { message } from 'antd';

const prepareOrderSummary = (items) => {
  let orderSummary = { totalPrice: 0, totalDiscountedPrice: 0, totalItems: 0, totalSaved: 0, deliveryCharges: 0 };
  let { totalPrice, totalDiscountedPrice, totalItems } = orderSummary;

  items.forEach((item) => {
    totalPrice += item.price;
    let discount = item.discount ? item.discount : 0;
    totalDiscountedPrice += item.price * (1 - discount / 100) * item.count;
    totalItems += 1;
  });
  orderSummary.totalSaved = totalPrice - totalDiscountedPrice;
  orderSummary.deliveryCharges = 10 * totalItems;
  return orderSummary;
};

const addToCartLocalStorage = (uniqueProducts, orderSummary) => {
  localStorage.setItem('cart', JSON.stringify({ products: uniqueProducts, ...orderSummary }));
};

const addToCartReduxStore = (uniqueProducts, orderSummary, dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: { products: uniqueProducts, ...orderSummary },
  });
};

const addToCartDB = (token, uniqueProducts) => {
  addToCart(token, uniqueProducts)
    .then((res) => {
      return res.data.successful;
    })
    .catch((err) => {
      message.error('Add To Cart Failed');
    });
};

export const addToCartHandle = (item, dispatch, user) => {
  let products = [];
  let uniqueProducts = [];
  let orderSummary;

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      products = [...cart.products];
    }
  }
  products.push({
    ...item,
    count: 1,
  });
  uniqueProducts = _.uniqWith(products, _.isEqual);
  orderSummary = prepareOrderSummary(uniqueProducts);
  addToCartLocalStorage(uniqueProducts, orderSummary);
  addToCartReduxStore(uniqueProducts, orderSummary, dispatch);

  if (user?.token) {
    addToCartDB(user.token, uniqueProducts);
  }

  message.success('Added To Cart');
};
